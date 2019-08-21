---
title: The contracts
permalink: /docs/contracts/
layout: default
---
# The contracts
  
We provide daily settlement price data and indicators for a selection of futures contracts traded at the main exchanges ([CME](http://www.cmegroup.com/), [EUREX](http://www.eurexchange.com/exchange-en/), [ICE](https://www.theice.com/index), [ASX](https://www.asx.com.au/), [SGX](http://sgx.com), [Montréal Exchange](https://www.m-x.ca/)), based on publicly available data (mostly from [Quandl](https://www.quandl.com/)). We carefully correct historical data from various anomalies (gaps, change of multiples, etc.).

As futures contracts are usually quoted only a few months or a few years before delivery date, settlement prices time series are typically made of several contracts “chained” together. In order to build long time series, we gather data from all individual contracts available and chain them automatically when you request them either one at a time, on the [Explore](/docs/explore/) page, or combined together in a portfolio, on the [Backtest](/docs/backtest/) page.
  
On this page we describe all the contracts you can use in your backtests.
  
{% assign grouped = site.data.contracts | group_by: "class" %}
{% for class in grouped %}
{: .makepill}
### {{ class.name }}
{% for contract in class.items %}
{% if contract.hide %}{% else %}
#### {{ contract.name }}
{{ contract.description }}
* Data code: {{ contract.code }}
* Ticker(s): {{ contract.ticker }}
{% if contract.specs %}* [Specifications]({{contract.specs}}){:target="_blank"}{% endif %}
{% endif %}
{% endfor %}
{% endfor %}