---
title: Backtest
permalink: /docs/backtest/
layout: default
---

# Backtest

This page allows you backtesting and visualizing futures contracts portfolios with numerous options. You can display several simulation results side-by-side and compare their performances and features. The top, shaded area allows you setting backtesting parameters while the results of your simulations will be displayed below it and split in analysis tabs.

## Backtest parameters

The backtest parameters zone allows you setting all the parameters that define a backtesting simulation. For each of your portfolios you can chose assets and strategies to combine, weighting rules, rebalancing options, risk management and rounding parameters.
Start by chosing a portfolio to edit or create a new portfolio or duplicate an existing one. You can backtest and save your changes at any time by clicking on the Save & Backtest main button. Other options are available from the dropdown menu of this button.

![Backtest parameters](/assets/capture1.jpg){: .img-fluid}

{: .makepill}
### General Settings

From this tab you can chose the name of your portofolio and opt for a type of weighting strategy.
Static weights imply that you set the weight of each asset class, asset and strategy. The weight finally used in the simulation can be different, in order to account for differences in the availability of historical data (see details below).
Dynamic weights imply that weights are set based on quantitative rules often derived from risk measures of the asset/strategy you whish to weight in the portfolio. At the moment we offer "inverse volatility" and "equal risk contribution" approaches.

{: .makepill}
### Assets Classes

This tabs allows setting weight for each assets class in your portfolio.

Backtest will start at a point in time where at least one contract for each asset class is available. We invite you to check in the [Overview](/overview/) page the starting date for the data of each contract.

{: .makepill}
### Assets

This tab defines your investment universe with all futures contracts used in your portfolio. All the contracts you want to use need to be defined here. When you chose a contract code, we propose a default ticker and multiplier; however you can customize them. If you intend to use several contracts for a specific code (for instance front and deferred contract) please add them here.

You can specify weights for each contract. The weight computed in the backtest will depend on data availability: the final weight for each contract will be the weight you defined divided by the number of contracts available in the same assets class. When we go back in time less data is available, thus the computed weights will adapt to keep constant leverage.

{: .collapsible}
#### Example

If CME/ES and EUREX/FESX are the only Equity contracts you select, and you assign a weight of 1 to each of them, the computed weight for CME/ES will be 1 before May 1999 when EUREX/FESX becomes available, and 0.5 afterwards. Computed weight for EUREX/FESX will be 0.5 from May 1999 onwards. 

{: .makepill}
### Strategies

In this tab you can define strategies for all selected contracts. You need to define at least one strategy for each contract, otherwise a contract without any strategy associated to it will not be included in the simulation. If you want to include a constant long position for a specific contract select the "long" strategy (which will be added by default when you add a contract to your investment universe.

{: .makepill}
### Rebalancing options

Default rebalancing rule is on the first working day of each month.

Advanced rebalancing rules are not implemented yet.

{: .makepill}
### Rounding options

By default, backtest is carried without rounding up positions. This is not realistic in a practical sense as futures contracts have a certain size and are not divisible. However, working with this assumption removes the influence of the size of the portfolio and allows studying strategies without taking into account the randomness of the size of the contracts.

Advanced rounding rules, which are very usefull to analyze the effect of the size of the contracts, are not available yet.

## Analysis tabs

In the lower section of the page, you can find the result of the backtest simulations you carried on.

{: .makepill}
### Overview

Display the backtested portfolio value, with statistical analysis of returns, and information on positions.

{: .makepill}
### Position

Display statistics on the historical positions for each contract.

{: .makepill}
### P&L Contributions

Provides an attribution of performance to each component of the portfolio. Contribution to the performance can be split up by asset class, by asset and by strategy, or a combination of the three. For the sake of lisibility, you can filter out some contributions from the analysis. Contributions to the performance of the portfolio are computed as the P&L of each individual component. The sum of all contributions is then equal to the portfolio value.  
