---
title: Explore
layout: default
author: futuresbacktest
permalink: /docs/explore/
source-id: null
published: true
---
# Explore

This page allows to explore all available contracts and individual strategies. You can add several simulations to the main screen to compare the effects of available options. 

If you want to combine strategies you can go directly to the [Backtest](/docs/backtest/) page.

## Add contracts or strategies

The greyed panel allows you to add or update contracts or strategies. You can set the following parameters:

### 1. Contract code

The product that you want to display (for instance, "S&P 500" or "WTI Crude Oil").

### 2. Continuous contract #

The rank of currently active contracts to select.

As there are several contracts active at the same time for each product (with different delivery dates), you need to chose which contract to display. Contract #1 — or "front" contract — is the closest expiring future contract, #2 is the contract expiring right after, and so on. For most futures contracts on financial products, the front contract is the most liquid and the most relevant, while for commodities, liquidity can be found years ahead of expiry date.

### 3. Adjust for rolls

You can chose to display raw contracts prices simply chained next to each other, or to adjust prices to take into account the effect of the "roll" between subsequent futures contracts. 

This price adjustment is necessary if you want to simulate a position hold on this contracts across an extended period of time.

If you only want to see what the absolute prices of a futures contract were at a given point in time, you can uncheck the "Adjust for rolls" checkbox.

### 4. Apply strategy

Explore available strategies for each product.

For most products, available strategies are:

* Long
* Short
* Several trend flavours
* Carry
* Value

See the [Strategies](/docs/strategies/) page for more details on available strategies.

### 5. Leverage

You can change the leverage  coefficient applied to the simulation. This can be useful for instance if you want to compare timeseries with very different volatilities.

### 6. Rebalancing options

For other strategies than "Long", or if you select a leverage different from 1, you can customize rebalancing frequency. The default option is monthly, end-of-month rebalancing. To customize rebalancing rules, click on the rebalancing rule displayed (no balancing rule is shown if strategy is "Long" and leverage is 1, because in this case it does not have any impact on the result).

When your done with the settings, press "Add" to fetch the simulation results. Alternatively, you can "Update" a currently displayed time series.

## View results

### Select time series

Once you have added a time series, it appears in the main graph and in a "tree" view below the menu. In the latter, you can select a time series and see the settings associated with it. You can also select the "subseries" you want to show. Depending on the type of time series, available subseries are:

* Position: The actual position hold in percent of the portfolio (1 means a simple, long position);
* Days to exp.: Number of days remaining before the end of the month where the current contract expires;
* Open Int.: Open interest for the current contract.

### Statistics

The table below the graph shows some statistics related to the time series currently displayed.
