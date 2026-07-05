# visit-counter

Self-hosted replacement for the dead countapi.xyz visit counter, same pattern
as the `openheart` Worker: a tiny KV-backed counter, no external dependency.

Excluded from the Jekyll build (see `exclude:` in `_config.yml`); deploy
separately with Wrangler.

## Deploy

KV namespace and `wrangler.toml` are already set up.

1. `npm install -g wrangler`
2. `wrangler login`
3. `wrangler deploy`

Publishes to `https://visit-counter.andrewbauman001.workers.dev`. If your
Worker ends up at a different URL, update the fetch call in
`_layouts/default.html`.

## API

- `GET /hit?id=visits` — increments, returns `{ "value": <count> }`
- `GET /count?id=visits` — reads without incrementing

`id` defaults to `visits`; useful later for per-page counters.

## Local testing

`wrangler dev`, then hit `http://localhost:8787/hit`.
