---
title: The contracts
permalink: /docs/contracts/
layout: default
---
# The contracts
  
We provide daily price data and indicators for a selection of futures contracts traded at the main exchanges ([CME](http://www.cmegroup.com/), [EUREX](http://www.eurexchange.com/exchange-en/), [ICE](https://www.theice.com/index), [ASX](https://www.asx.com.au/), [SGX](http://sgx.com), [Montréal Exchange](https://www.m-x.ca/)).
  
Prices are made available publically on [Quandl](https://www.quandl.com/). We carrefuly correct the data from various anomalies (gaps, change of multiples, etc.).
  
On this page we describe the futures contracts you can find on FuturesBacktest.
  
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
