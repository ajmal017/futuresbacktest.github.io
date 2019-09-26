---
layout: post
sitemap: false
title:  "Introducing Dynamic Allocation"
permalink: /drafts/dynamic/
date:   2019-05-20
author: Martin
categories: general
---

We are introducing options to compute assets weights dynamically at each rebalancing date, featuring mean-variance and risk-parity methods. We'll walk you through these new options.

You can now backtest futures contracts portfolios based on the most popular and best documented portfolios construction methods. Our general approach to portfolio construction is always the same:

1. compute some indicators of future returns based on a combination of  strategies you select (trend following, carry or value - or a more neutral assumption of equal expected sharpe ratio);
2. compute weights for each asset at each rebalancing date; 
3. apply some risk management procedures (target volatility) and optionally round positions to integer numbers of contracts.

When calculating the positions at each rebalancing we use only data available at this point in time. By doing so, we avoid the pitfalls of in-sample optimization: you don't want an overfitted setup that shines in the backtest and proves very disappointing in live mode.




When 


Generally speaking, the 
 Mean  This dynamic allocation approach
, which fall mostly under the risk-arity" approach. What is meant by this? You no longer need to set weights for the assets in your portfolio; we compute them automatically at each rebalancing date, using only the data available at this point in time, as always. 

Risk parity portfolio allocation encompass different methods which