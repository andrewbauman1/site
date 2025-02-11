---
layout: default
title: Blogroll
type: static
---

<a href="/blogroll.xml">RSS</a>

Just a collection of some professionals & blogs I am following.

This page is frequently updated & not sponsored. Only websites that are being actively updated are included (in theory), and the order is randomized on build.

---

<!-- Assign the 'links' variable to a randomized list of blogroll entries -->
{% assign links = site.data.blogroll | sort: "title" | sample: site.data.blogroll.size %}
{%- for item in links %}
<h2><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a> <code class="smol">({{ item.lang }})</code></h2>
<p>{{ item.description }}</p>
{%- endfor %}
