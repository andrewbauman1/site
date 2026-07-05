/**
 * Self-hosted visit counter (Cloudflare Worker), replacing countapi.xyz.
 *
 *   GET /hit?id=visits    -> increments, returns { value }
 *   GET /count?id=visits  -> reads without incrementing, returns { value }
 *
 * id defaults to "visits". Requires a KV namespace bound as VISIT_COUNTER.
 */

// Public, non-sensitive data - wildcard CORS is safe here.
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = corsHeaders();

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...headers },
      });
    }

    const id = url.searchParams.get("id") || "visits";
    const key = `count:${id}`;

    let count = parseInt(await env.VISIT_COUNTER.get(key), 10);
    if (Number.isNaN(count)) count = 0;

    if (url.pathname === "/hit") {
      count += 1;
      await env.VISIT_COUNTER.put(key, String(count));
    } else if (url.pathname !== "/count") {
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...headers },
      });
    }

    return new Response(JSON.stringify({ value: count }), {
      headers: { "Content-Type": "application/json", ...headers },
    });
  },
};
