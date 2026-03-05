---
title: 'Fetch Solana token data from LYS Labs Aggregation API'
summary: "Fetch token metadata from the LYS Labs Solana Aggregation API by mint address. Requires 1 argument (mint) and 1 secret (LYS_API_KEY). Returns a JSON string containing mint/name/symbol/supply."
date: '2026-01-19'
author:
  name: LysLabs
  link: https://lyslabs.ai/
---
/**
 * LYS Labs Solana Aggregation API example for Chainlink Functions
 *
 * Args:
 * - args[0]: Solana mint address (string)
 *
 * Secrets:
 * - secrets.LYS_API_KEY: API key created in the LysLabs developer portal
 *
 * Create an API key: https://dev.lyslabs.ai/ (sign up → dashboard → API Keys)
 *
 * API Docs:
 * - https://agg-api-solana-mainnet.lyslabs.ai/api-docs
 */

const mint = args[0]

if (!mint || mint.length === 0) {
  throw Error("mint is required (args[0])")
}

if (!secrets.LYS_API_KEY) {
  throw Error("LYS_API_KEY secret is required")
}

const url = `https://agg-api-solana-mainnet.lyslabs.ai/v1/aggregated/${mint}`

const resp = await Functions.makeHttpRequest({
  url,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": secrets.LYS_API_KEY,
  },
})

if (resp.error) {
  throw Error("request failed")
}

const data = resp.data || {}
const name = data.name || (data.lifecycle && data.lifecycle.name) || "Unknown"
const symbol = data.symbol || (data.lifecycle && data.lifecycle.symbol) || "TOK"
const supply = Number(data.supply || (data.lifecycle && data.lifecycle.uiAmount) || 0)

const out = { mint, name, symbol, supply }

return Functions.encodeString(JSON.stringify(out))