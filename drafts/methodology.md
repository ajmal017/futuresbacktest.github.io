---
title: Methodology
permalink: /drafts/methodology/
sitemap: false
layout: default
---

# Methodology

On FuturesBacktest you can experiment with popular portfolio construction methods, supported by academic literature. The possibilities are:

* static weights, where you set the weight of each asset or asset class “by hand”;
* inverse volatility, where each asset is weighted proportionally to the inverse of its volatility;
* mean-variance, inspired by Markowitz’s “Modern Portfolio Theory”;
* risk budgeting, or equal risk contribution, a popular risk-parity approach;
* agnostic risk parity, a relatively newer and less well known approach to risk parity.

Our general approach to portfolio construction is the following:
1. define the assets universe,
2. except for the above mentioned “static weights” option, scale all assets to 10% expected volatility (using the recent realized volatility as a predictor of expected volatility, to keep it simple),
3. calculate an aggregated indicator of expected returns for each (scaled) asset (this is where the [“strategies”](/docs/strategies/) come in),
4. use one of the above mentioned [weighting methods](/docs/weighting/) to compute assets weights,
5. compute the final position for each asset as the product of aforementioned aggregated indicator value and asset weight,
6. optionally, apply risk management procedures (set global leverage to target a given volatility),
7. optionally, round positions to the closest integer number of contracts to simulate the granularity of futures contracts (optionally applying a more advanced algorithm for rounding).

Based on these computed positions, we compute the simulated portfolio historical daily values. We assume that trades are executed at settlement price on a given rebalancing date, using only settlement prices up to the day before this date, in order to ensure causality. You can use custom rebalancing dates: at given dates of each month, on a given day of each week, or every day. We do not simulate (yet) any trading fees and commissions.

We assume full rebalancing of the portfolio at each rebalancing date. In practice, due to the granularity of futures contracts, positions can be kept at the same level for longer periods of time. This approach is a bit different from backtesting approaches with entry and exit dates for trades: it is computationally simpler and allows us to compute backtests in a matter of seconds instead of minutes on other backtesting platforms.

Our backtests assume also that contracts can be rolled anytime (i.e. on dates which are different from rebalancing dates). Rolling from a contract to the next one happens according to the rules you set (for instance, taking a position always on the front contract, or on the contract with the highest open interest and at least 12 months before expiry, etc.).

As historical data availability can differ between futures contracts, the simulation starts when data is available for at least one asset in each asset class.

We choose not to offer optimization features based on past performance, because optimizing portfolio allocation while avoiding overfitting (improved backtested performance with poor out-of-sample results) is hard. Instead, all the portfolio construction methods we propose rely on volatility and correlations estimations, and indicators of future returns (trend following, carry and value indicators). It is up to you to use or not these indicators of expected returns.

You can read more on the weighting approaches we propose on [this page](/docs/weighting/). We also share the actual Python code we use to compute assets weights.