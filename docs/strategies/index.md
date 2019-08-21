---
title: The strategies
permalink: /docs/strategies/
layout: default
---

# The strategies

On FuturesBacktest you can test popular investment strategies on futures contracts. A strategy means that allocation of capital to a specific asset is not constant and varies depending on an estimate of future returns or more generally a belief that the price will go in one direction or the other. We compute 3 families of *indicators* of futures returns, namely trend, value and carry, which we describe in more detail below.

Trend following may be the most popular strategy on futures contracts; carry is also popular and value is maybe less used or studied in the literature.

You can test these strategies applied to a single asset, on the [Explore](/docs/explore/) page (with much details) or on a portfolio of assets on the [Backtest](/docs/backtest/) page (with less details on individual indicators). Generally speaking, the value of these indicators is best revealed when they are combined across multiple assets in all assets classes, as the individual prediction power of each indicator on each asset future returns is quite low.

For each family of strategy, you can customize most parameters used to compute indicators values and analyze the influence of these parameters. You will find below the description of each strategy.

## Trend

Trend following is based on the fact that most assets prices tend to exhibit trends pattern in a few months time span. The strategy is simple: buy when price is rising, sell when it is falling. The variations of this strategy basically lie in the trend indicator chosen and in the time span over which we are looking at trends. On FuturesBacktest you can test three kinds of trend following indicators:

- Exponentially weighted moving average of past returns (it means than recent returns have more weights than ancient ones);
- Crossing of two exponential moving averages (a "fast" one and a "slow" one);
- Rolling linear regression.

You can read more on how to set parameters for trend following strategies and how we compute them (with the actual Python we use if you are interested) on [this page](/docs/strategies/trend/).

## Value

A *value* strategy is kind of the opposite of trend following, over longer time spans (5 years or more). The general idea of this strategy is to go long when an asset appears relatively cheap by some measures, and go short when it looks expensive.

## Carry

Carry is less straightforward than trend and value and may be more difficult to understand. The concept of carry is that each futures contract yields an implicit rate of return that an investor will pay or earn if all market conditions remain unchanged (more specifically if interest rates and the term structure of the futures contracts stay the same), while holding a position on this futures contract.

The strategy is then to go long on the futures contract which yield the highest implicit rate (highest carry) and short the ones with the lowest carry.

We require different definitions of carry for each asset classes and some are more straightforward or opinionated than others. You can find the precise definition of carry we use for each asset class on [this page](/docs/strategies/carry/).