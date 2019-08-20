---
title: Trend Following
permalink: /docs/strategies/trend/
layout: default
---

# Trend following

Trend following is a popular strategy: buy when price is rising, sell when it is falling. An other way to put it is "Buy high, sell higher" and "Sell low, buy lower". Such a simple strategy, appropriately diversified across assets, has reported significant returns in the past. It can be considered as a persistent market anomaly which has been well documented. Among reported explanations, you can find:
- the relatively slow propagation of information which takes time before being fully reflected in assets prices;
- investors taking profits along the way, slowing down price rise.

On FuturesBacktest you can test three main trend following indicators families, with many possible variations:
1. exponential moving average of returns;
2. crossing of exponential moving averages;
3. rolling linear model.

All these trend following strategies rely on a single asset own past returns. These returns are calculated using the daily settlement prices of individual futures contracts on a given asset, stiched together to get continuous futures contract time series data. For EMAC and LM indicators, we cumulate these log-returns so that we work on a time series of the continuous futures contract settlement prices adjusted for rolls.

## 1. Exponential moving average of returns (EMA)

This trend indicator is rather standard in trend following litterature and can be adapted to detect trends over different timeframe. 

We take the (arithmetic) rolling average of log-returns over a given time window and the sign of the result decides on the indicator: trend is up (+1) if this rolling average is positive and down (-1) if it is negative. 

We use a rolling window with exponential weights in order to give recent returns more weight than older ones. We can chose the timeframe of our indicator by chosing the "half-life" of our weighting window, which is the date were the weight of an observation is half the weight of the most recent observation. If we chose a longer "half-life", the indicator will be more stable but also slower when taking into account new information. If we chose a shorter "half-life", the indicator will react faster but will also feature more frequent variations.

You can actually pick 3 different half-life values in a single call; the resulting indicators will be averaged out. The default behaviour is an average of indicators computed with 20, 40 and 80 trading days half-lives.

The syntax of this trend indicator is `EMA(t1, t2, t3)` where `t1`, `t2` and `t3` are the half-lives of the 3 trend indicators to average out. `t2` and `t3` are optional arguments.

You can find the complete code of this indicator below:

{% gist 74fc35faa7b89b2c95b1b4c53ff4b9ee strategies.trend.ema.py %}

## 2. Exponential moving averages crossing (EMAC)

Rolling averages crossing indicator is based on two moving averages of a time series:
- a fast rolling average, based on a shorter time window;
- a slow rolling average, based on a longer time window.

The indicator we compute is simple: trend is up (+1) if the fast rolling average is greater than the slow rolling average and down (-1) if the fast rolling average is lower than the slow one.

For the two rolling averages we use a rolling window with exponential weights. You can chose the half-life values for the two moving averages. The default is 20 trading days for the fast rolling average and 100 trading days for the slow one.

The syntax of this trend indicator is `EMAC(tfast, tslow)` where `tfast` is the half-life of the fast moving average and `tslow` the half-life of the slow rolling average.

You can find the complete code of this indicator below:

{% gist 74fc35faa7b89b2c95b1b4c53ff4b9ee strategies.trend.emac.py %}

## 3. Rolling linear model (LM)

When we want to get the "trend" of a time series, checking if its "slope" is positive or negative seems like an intuitive idea.

We achieve this using a linear regression of the logarithm of the continuous futures contracts settlement prices adjusted for rolls. We calculate a linear regression for every trading day, over a rolling window with exponential weights.

We then take the sign of the slope to determine if we are long or short, or neutral if there is no significant slope (based on the R squared statistic of the linear regression):
- if $$slope > 0$$ and $$R^2 > R^2_{lim}$$ then $$signal = 1$$
- if $$R^2 < R^2_{lim}$$ then $$signal = 0$$
- if $$slope < 0$$ and $$R^2 > R^2_{lim}$$ then $$signal = -1$$

By default, $$R^2_{lim} = 0.1$$

You can actually pick 3 different half-life values in a single call; the resulting indicators will be averaged out. The default indicators is an average of 20, 40 and 80 trading days half-lives.

The syntax of this trend indicator is `LM(t1, t2, t3, R2lim)` where:
- `t1`, `t2` and `t3` are the half-lives of the 3 trend indicators to average out;
- `R2lim` is the $$R^2$$ coefficient which will be used to decide if the slope is significant or not (default to 0.1).

`t2`, `t3` and `R2lim` are optional arguments.

You can find the complete code of this indicator below:

{% gist 74fc35faa7b89b2c95b1b4c53ff4b9ee strategies.trend.lm.py %}