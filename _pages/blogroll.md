---
layout: default
title: Blogroll
type: static
---

<a href="/blogroll.xml">RSS</a> <a href="/blogroll.opml">OPML</a>

Sites and blogs I'm actually reading, grouped loosely by topic. Visit them individually, or [download this as OPML](/blogroll.opml) to import into a feed reader &mdash; [Feedbin](https://feedbin.com/), [NetNewsWire](https://netnewswire.com/), and [NewsBlur](https://newsblur.com/) are all solid options.

This page is frequently updated & not sponsored. Only sites that are still actively updated make the cut (in theory).

{% assign grouped = site.data.blogroll | group_by: "category" | sort: "name" %}
{% assign langs = site.data.blogroll | map: "lang" | uniq | sort %}
<style>
  {% for group in grouped %}
  body:has([name="category"][value="{{ group.name }}"]:not(:checked)) .blogroll-group[data-category="{{ group.name }}"] { display: none; }
  {% endfor %}
  {% for lang in langs %}
  body:has([name="lang"][value="{{ lang }}"]:not(:checked)) .note[data-lang="{{ lang }}"] { display: none; }
  {% endfor %}
</style>

<details class="details-note-tags">
  <summary class="monospace smol">Category filter</summary>
  <form action="#" method="get" class="note-tags">
    {% for group in grouped %}
    <label class="note-tag" data-tag="{{ group.name }}">
      <input id="cat-{{ group.name | slugify }}" name="category" value="{{ group.name }}" checked type="checkbox">
      {{ group.name }}
      ({{ group.items.size }})
    </label>
    {% endfor %}
    <hr class="inline-hr">
    <button type="reset" class="note-tag check-all-tag">Check all</button>
  </form>
</details>

<details class="details-note-tags">
  <summary class="monospace smol">Language filter</summary>
  <form action="#" method="get" class="note-tags">
    {% for lang in langs %}
    {% assign items_with_lang = site.data.blogroll | where_exp: "item", "item.lang == lang" %}
    <label class="note-tag" data-tag="{{ lang }}">
      <input id="lang-{{ lang | slugify }}" name="lang" value="{{ lang }}" checked type="checkbox">
      {{ lang }}
      ({{ items_with_lang.size }})
    </label>
    {% endfor %}
    <hr class="inline-hr">
    <button type="reset" class="note-tag check-all-tag">Check all</button>
  </form>
</details>

{% for group in grouped %}
<div class="blogroll-group" data-category="{{ group.name }}">
<div class="section-head blogroll-category-head">
  <h2>{{ group.name }}</h2>
</div>
{% assign items = group.items | sort: "title" %}
<ul class="notes blogroll-list">
{%- for item in items %}
<li class="note" data-lang="{{ item.lang }}">
<div class="general-actions">
<h2 class="text"><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></h2>
<code class="smol lang-pill">{{ item.lang }}</code>
</div>
<div class="note-content">
<p>{{ item.description }}</p>
{% if item.feed %}<p class="desc"><a href="{{ item.feed }}" target="_blank" rel="noopener noreferrer">Feed</a></p>{% endif %}
</div>
</li>
{%- endfor %}
</ul>
</div>
{% endfor %}
