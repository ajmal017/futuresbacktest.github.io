---
layout: post
title:  "Backtesting Futures 101"
date:   2018-12-17
last_modified_at: 2019-10-20
author: Martin
categories: general
image: /assets/school.jpg
image-alt: School 
image-caption: |
  Photo by Element5 Digital on <a href="https://unsplash.com/">Unsplash.com</a>
charter: true
---

You may be familiar with backtesting individual stocks or ETF portfolios. Futures contracts are different in some ways. We’ll discuss some of these differences and what it means for our backtests.
<!--more-->

## From individual contracts to continuous contracts

Futures contracts are usually traded for a short period of time, especially futures on financial products. As the delivery date is approaching, in order to keep a long position one would need to “roll” his or her position to the next contract (quite often the contract expiring three months later). So if we want to see time series longer than a few months, we need to stitch together data from many individual contracts.

There are several ways to do it, depending on what we want to see. If we just want to see the absolute price of let's say WTI crude oil front contracts (the closest expiring) over time, as a proxy of spot price, we can paste settlement prices of all front contracts one after another. It does not however reflect the P&L resulting from holding a long position on such contract over the same timeframe and it can actually be far from it. The problem is that the price jump when switching from an expiring contract to the next is not P&L.

To get a more accurate view of what would an investor actually see when holding a position on this contract over the same time period, we need to compute daily returns for each contract, stitch the returns of all successive front contracts and cumulate them over the chosen period[^1] to compute the total P&L of this position.

Here is an example of such a price adjustment on futures contracts on Mexican Peso (MXP):

{% include chart.html collection="blog-201812-futures-101" key="mxp" id="mxp-chart" compare="true" logscale="true" version="2" %}

Because short term interest rates in pesos were higher that their USD counterpart, the equity value of long position on MXP during this period actually increased (net gain) while the spot exchange rate would indicate a 50% loss if not adjusted.

This effect can also play the other way around. Look at this example on natural gas futures: 

{% include chart.html collection="blog-201812-futures-101" key="ng" id="ng-chart" compare="true" logscale="true" version="2" %}

Natural gas is expensive to store and you will pay a very high cost of carry when holding a long position on such futures contracts. In this example, you lose more than 99% of your equity! The unadjusted time series does not show the same picture with a mere 46% drop in price over the same period.

When retrieving futures contract time series on FuturesBacktest, roll adjustment is enabled by default, thus it simulates the P&L resulting from holding a long position over time. You can also disable roll adjustment, if you are looking for actual past prices.  

[^1]: We may write about it later in more details but usually the most correct way to cumulate returns is to cumulate them geometrically (i.e. Next Value = Last Value * (1+return)) rather than arithmetically (i.e. Next Value = Last Value + return).

## Watch the size: the “granularity” effects

Futures contracts usually make rather large positions. For instance, E-mini S&P 500 (one of the most traded) is still over USD100k despite its “mini” attribute. When looking at individual portfolios in the hundreds of thousands, the contract size compared to total capital can be very significant. And it is of course not possible to buy or sell only a fraction of a contract.

The granularity of possible positions is to be taken into account in our backtests in order to get reasonably realistic simulations. The first thing is to choose a universe of contracts suited to the account size. A larger number of contracts leads to greater diversification in the backtest, but there is no point in it if it leads to no position at all when rounding the positions to the closest (integer) number of contracts. Also, when exploring strategies with position changing rapidly over time (e.g. trend following), rather different positions can be rounded to the same number of contracts[^2].

[^2]: For instance if the “real” position we would like to take is 1.45 contracts and later 0.55 contracts, we will round the position to 1 contract in both periods, thus resulting in a very different story than if we could have taken our fine-tuned positions.

We don't know a perfect way to account for this effect in our backtest, because accounts sizes vary over time and and contracts size do too (because of varying prices). A sensible way to test the effect of the not-so-fine granularity of possible positions is to consider contracts sizes as fixed percentages of account size (for instance considering today’s account size and contracts sizes). It can give you a hint of the differences in positions and P&L that can be expected; however it is not a panacea as it is not a realistic simulation.

## Futures contracts P&L is “Excess return”

A futures contract is a firm commitment to buy or deliver a specified underlying asset or commodity at a given date and at a given price. At delivery, the two parties involved can in theory just exchange the cash difference between the agreed price and the spot (settlement) price and buy/sell the underlying on the spot market if they need to. Futures contracts on financial assets (equity index, government bonds, etc.) are most often “cash settled” this way.

As a consequence, positions on futures contracts do not require as much cash as the position size, but only a fraction of it (the margin) which is secured by the clearing house to reduce counterparty risk (as little as a fraction of a % for positions on low volatility products such as short term fixed income products). Thus, futures contracts positions are not funded: logically, the holder of a long futures position is not remunerated at the risk free rate on the amount of the position because he actually put no cash on the table except the required margin.

There, a substantial difference arises in backtests between equities/bonds and futures: the equity curve resulting from holding a given security (let’s say a S&P 500 ETF) is total return, whereas the equity curve resulting from holding a long position in a futures contract (on S&P 500) is “excess return”. To make these two comparable, one need to add the risk free rate to excess return to get a sense of the total return. Indeed, the cash amount which is not invested in the futures contract position can be invested in short term treasury bills and yield the risk free rate.

## FX exposure

Taking a position on a futures contracts labelled in a currency different from your account main currency is possible and quite different from buying stocks or ETF labelled in foreign currency. As we said earlier, positions on futures contracts are not founded; thus the holder of such a position is not exposed to currency risk.

We will present this with an example:

1. Our main account currency is USD. We bought 1000 shares of an ETF tracking EURO STOXX 50 index performance, labelled in EUR. A month later, the index (and our shares) went up 5% in EUR, but over the same period of time EUR went down 5% v.s. USD. As a result, our equity is unchanged, as our gains on the shares are erased by a loss in FX.

2. We now take the same position on a futures contract on EURO STOXX 50 index, with a multiplier of x1000. A month later, the index goes up 5% and EUR goes down 5% v.s. USD. As we did not change any USD cash to take the position, we are not exposed to FX loss and end up with approximately[^3] +5% of the position size in EUR on our account.

[^3]: It is actually more complicated than that; we will discuss later in more details the pricing of futures contracts, which involves also dividends and short term financing rate. Also, the gain in EUR is subject to FX gains or losses (but the exposure is limited to this EUR gain and not the whole position).

The takeaway of this example is that futures contracts are inherently edged against FX rates fluctuations. To achieve a similar behaviour with shares, one would need to edge the currency exposure separately. This is neither good or bad and depends on our objectives, but it is worth keeping in mind when dealing with futures contracts labelled in a foreign currency.

## Conclusion

We have covered some of the specific features of futures contracts, which impact the way we compute our backtests. To dive deeper into futures contracts backtesting, give a try to our online backtesting platform to see the effect of roll adjustment! Our [docs](/docs/) is here to get you started.