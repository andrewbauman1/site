---
layout: default
title: Blogroll
type: static
---

<a href="/blogroll.xml">RSS</a>

This page is frequently updated. Only websites that are being actively updated are included (in theory), and the order is randomized on build.

---

<!-- Assign the 'links' variable to a randomized list of blogroll entries -->
{% assign links = site.data.blogroll | sort: "title" | sample: site.data.blogroll.size %}

<!-- Loop through each item in the 'links' list -->
{%- for item in links %}
  <!-- Display the title as a heading with a link to the URL -->
  ## [{{ item.title }}]({{ item.url }}) <code class="smol">({{ item.lang }})</code>    
  <!-- Display the description of the blog -->
  {{ item.description }}
{%- endfor %}
