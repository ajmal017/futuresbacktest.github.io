---
layout: draft_post
sitemap: false
title:  "Introducing Dynamic Allocation"
permalink: /drafts/dynamic/
date:   2019-10-20
author: Martin
categories: general
image: /assets/gears.jpg
image-alt: Gears
image-caption: |
    Public domain photo by <a href="https://pxhere.com/">Pxhere</a>
charter: true
---

We are introducing options to compute assets weights dynamically at each rebalancing date, featuring mean-variance and risk-parity methods. We'll walk you through these new options.
<!--more-->

You can now backtest futures contracts portfolios based on the most popular and best documented portfolios construction methods. Our general approach to portfolio construction is always the same:

1. compute some indicators of future returns based on a combination of  strategies you select (trend following, carry trading or value - or a more neutral assumption of equal expected sharpe ratio);
2. compute weights for each asset at each rebalancing date; 
3. apply some risk management procedures (target volatility) and optionally round positions to integer numbers of contracts.

For step 2, you can now use automated weights calculation at each rebalancing date instead of setting the weights "by hand". This is better, because asset weights computation based on volatility metrics and maybe correlations estimates is less arbitrary. When assessing investment strategies on backtested performance, less arbitrary choices means that the simulated performance has a better chance to persist in out-of-sample time periods or assets (of course there is no guarantee that it will be the case though!).

When calculating the positions at each rebalancing date we use only data available at this point in time. By doing so, we try again to avoid the pitfalls of in-sample optimization: you don't want an overfitted portfolio that shines in the backtest and proves very disappointing in live mode. This implies that we need to compute estimates of volatilities and correlations, and resulting asset weights, at each rebalancing date.

We cannot emphasize it enough: to make the most of your backtests, you do not want to chase overly optimistic backtested performance with fine-tuned strategies and asset weights, but rather to test strategies as simple and agnostic as possible, in order to maximize your chances of success out-of-sample.

Now, back to the point:

## Mean-variance

Mean-variance portfolio optimization is derived from the work of Markowitz on "efficient" portfolios, meaning that you get the maximum returns for a given level of risk, or the minimum risk for a given level of returns. You can find a lot of details on the internet regarding mean-variance optimization and more generally the "Modern Portfolio Theory", beginning with [Wikipedia](https://en.wikipedia.org/wiki/Modern_portfolio_theory).

On FuturesBacktest you can try both unconstrained and constrained mean-variance optimization. In both cases we use volatility and correlations estimates, and an indicator of expected returns computed as a weighted average of the strategies you select. Constrained optimization means that we force the final positions to have the same sign as the computed indicator of expected returns; it is more intuitive but it will force some weights to zero. Unconstrained optimization will yield short positions while your indicators says positive expected returns and vice-versa, but it is easier to compute as their is a well known analytical solution for this problem.

The idea behind mean-variance optimization is that positive correlation between two assets with different expected returns can be exploited to enhance risk-adjusted returns: the asset with the lower expected returns can be used to hedge the position on the other one, thus reducing risk while earning the difference between the two expected returns (it works also in case of negative correlation).

The main problem of mean-variance optimization is that it is very sensitive to correlations and returns estimates and that it will tend to concentrate portfolios on a small number of bets. As a consequence, thus theoretically appealing, it is not widely used by practitioners as is. 

## Risk-Parity strategies

Most of the weighting methods we propose fall under the umbrella of "Risk-Parity". This means in general that we will size position not based on contracts sizes in USD equivalent but rather on their relative "riskiness". This is especially relevant in the world of future contracts where:

- the underlyings in different asset classes can feature very different risk profile (equity vs. bonds, to name a few);
- leverage, inherent to future contracts, allows scaling position to basically every level with very little funding concerns if the level of risk stays low.

The term "Risk-parity" usually refers to long-only strategies, where no assumption is made on future returns. However, it is frequent also in CTA or "managed futures" strategies such as trend following (which most "managed futures" funds implement) to scale positions based on expected volatility.

### Inverse volatility

The simplest method we propose is inverse volatility, which is the most naïve risk-parity approach one could think of, with no estimate of correlations. In this approach asset weights are set proportionally to the inverse of their expected volatility. To keep it simple we use recent realized volatility as a proxy. 

However, inverse volatility is not ideal if you select assets that are correlated. Let's take an extreme example: take a collection of 5 futures contracts on equity indexes, alongside US 10yr bonds futures. In such a case, the contribution of the "equity" asset class to your portfolio performance (good or bad) will be much larger than the contribution of the "bonds" asset class, thus not achieving proper diversification, because the 5 equity contracts will often move together. You can try this sample portfolio [here](/backtest/QWUsQtrhH) (don't hesitate to tweak weighting settings and look at the resulting P&L contributions, split by asset class).

To overcome this, you can choose to equalize expected volatility in each asset class (just by ticking a checkbox), to force the weights calculation to take into account the number of contracts for each asset class. This works well with rather homogenous asset classes (equity and bonds, to name a few), but is more problematic in other asset classes, where it becomes rather arbitrary and depends on the definition of asset classes (for instance, should we consider agricultural products, metals and energy together or separately?).

### Equal Risk Contribution

Equal risk contribution (ERC) is a form of risk parity strategy which takes into account volatilities and correlations estimates. Basically, the risk contribution of each asset in a portfolio is defined as follows:

$$ RC_i = w_i \sum_{j}{w_j \sigma_{i,j}} $$

Where $$w_i$$ denotes the weight of the asset $$i$$ and $$\sigma_{i,j}$$ denotes the covariance between the returns of assets $$i$$ and $$j$$ ($$\sigma_{i,i}$$ is equal to the variance of the returns of asset $$i$$).

This mathematical definition implies that the sum of the risk contributions of all assets amounts to the expected variance of the portfolio returns. 

The idea of equal risk contribution portfolio is then to equalize the risk contribution of each asset, using an optimization procedure.

The original description[^1] of ERC portfolio focuses on long only portfolios and does not embody any assumption of future returns. This can be seen as an issue for some managers who may have some views on expected returns. Furthermore, especially in the world of futures contracts, there is not always such a thing as a natural "long position" (take for instance futures contracts on foreign currencies). This is why we need to adapt the definition of the ERC portfolio, while  retaining the principle of risk contributions.

[^1] {% include citation.html key="maillard2009" %}

Risk contributions of long or short positions in a portfolio can be either positive or negative, depending on each asset volatility and cross-assets correlations. In the context of long/short futures contracts portfolios, we will aim at risk contributions equal to the absolute value of our indicator of expected returns, while ensuring that the sign of each position (long/short) is the same as the sign of expected returns.

### Agnostic Risk Parity

Agnostic risk parity is a relatively newer portfolio method. Its premises are to build "synthetic assets" based on linear combinations of the actual assets in the portfolio, which are uncorrelated with each other. Based on these set of uncorrelated synthetic assets, the idea is to size positions proportionally to the expected returns of original assets. The original article[^2] explains this in greater details.

[^2] {% include citation.html key="benichou2017" %}

## Conclusion

To sum up, we have gathered examples of allocation with all portfolio weighting methods, using a universe of 14 bonds and equity futures contracts, targeting 10% annualized volatility:

{% include chart.html collection="blog-201910-dynamic" key="long" id="long-chart" compare="true" logscale="true" version="1" %}

As you can see, the results look very similar for these long portfolios, with an annualized Sharpe Ratio of roughly 0.95 over the period.

We will cover in the next articles application of these weighting methods to trend following, carry and value strategies to uncover their benefits in this context.