---
title: Bibliography
permalink: /docs/biblio/
layout: default
---

# Bibliography

We include here a list of relevant papers on trend, carry and value strategies as well as asset allocation or portfolio construction methods.

{% for entry in site.data.biblio %}

* {% include citation.html key=entry.key %}

{% endfor %}