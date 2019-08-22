---
title: Bibliography
permalink: /docs/biblio/
layout: default
---

# Bibliography

We include here a list of relevant article on trend, carry and value strategies as well as assets allocation or portfolio construction methods.

{% for entry in site.data.biblio %}

* {% include citation.html key=entry.key %}

{% endfor %}