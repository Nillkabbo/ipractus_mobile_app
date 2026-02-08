#!/usr/bin/env node
/**
 * Local API proxy for Expo Go when the device cannot reach be.ipractus.com directly.
 * Run on your Mac; point the app to http://YOUR_MAC_IP:3099/api via EXPO_PUBLIC_API_BASE.
 *
 * Usage:
 *   node scripts/dev-api-proxy.js
 *   # Then: EXPO_PUBLIC_API_BASE=http://10.0.0.142:3099/api npx expo start --clear
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

const PROXY_PORT = Number(process.env.API_PROXY_PORT) || 3099;
const TARGET_ORIGIN = 'https://be.ipractus.com';

function getClient(url) {
  return url.startsWith('https:') ? https : http;
}

function pipe(req, res, targetUrl, body) {
  const parsed = new URL(targetUrl);
  const options = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
    path: parsed.pathname + parsed.search,
    method: req.method,
    headers: { ...req.headers, host: parsed.host },
  };
  delete options.headers['host'];
  options.headers['host'] = parsed.host;

  const client = getClient(targetUrl);
  const proxyReq = client.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  proxyReq.on('error', (err) => {
    console.error('[proxy] upstream error:', err.message);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Bad Gateway', message: err.message }));
  });
  if (body && body.length) proxyReq.write(body);
  proxyReq.end();
}

const server = http.createServer((req, res) => {
  const targetUrl = TARGET_ORIGIN + req.url;
  if (process.env.DEBUG) {
    console.log('[proxy]', req.method, req.url, '->', targetUrl);
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    pipe(req, res, targetUrl);
    return;
  }

  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    pipe(req, res, targetUrl, Buffer.concat(chunks));
  });
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`[dev-api-proxy] Forwarding http://0.0.0.0:${PROXY_PORT} -> ${TARGET_ORIGIN}`);
  console.log(`[dev-api-proxy] On your phone, use the same Wi‑Fi as this machine and set:`);
  console.log(`[dev-api-proxy]   EXPO_PUBLIC_API_BASE=http://YOUR_MAC_IP:${PROXY_PORT}/api`);
  console.log(`[dev-api-proxy] Then run: EXPO_PUBLIC_API_BASE=http://YOUR_MAC_IP:${PROXY_PORT}/api npx expo start --clear`);
});
