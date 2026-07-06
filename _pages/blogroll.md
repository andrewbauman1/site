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
<ul class="notes blogroll-list">
{%- for item in links %}
<li class="note">
<div class="general-actions">
<h2 class="text"><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></h2>
<code class="smol lang-pill">{{ item.lang }}</code>
</div>
<div class="note-content">
<p>{{ item.description }}</p>
</div>
</li>
{%- endfor %}
</ul>
