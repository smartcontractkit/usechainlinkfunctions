---
title: 'Calculate the median price of a token on Uniswap V2'
summary: 'This function calculates the median price of a token that is on Uniswap V2. It works by sampling up to 4 prices over a given time period then chooses the median value'
date: '2023-02-09'
author:
  name: moonthoon
  link: https://moonthoon.io
---
// Max sample size is 4 due to 5 http request limit
const SAMPLE_SIZE = 4
// The number of decimals the price in USD is formatted to
const DECIMALS = 18
// A block buffer to take into consideration the synchronization of the subgraph
const GRAPH_BLOCK_BUFFER = 50
const AVG_SECONDS_PER_BLOCK = 12

// Token address
const token = args[0].toLowerCase();
// Pair address
const pair = args[1]
// Period in seconds
const period = args[2]

const blockRange = period / AVG_SECONDS_PER_BLOCK

if (!secrets.rpc) {
  throw Error("\"rpc\" environment variable not set")
}

const blockNumberResponse = await Functions.makeHttpRequest({
  url: secrets.rpc,
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  data: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: "1",
  }),
})

if (blockNumberResponse.error) {
  throw Error("Unable to fetch current block number")
}

const blockNumber = parseInt(blockNumberResponse.data.result, 16) - GRAPH_BLOCK_BUFFER

const fetchPrice = (blockNumber) => Functions.makeHttpRequest({
  url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  method: "POST",
  data: {
    query: `{
      pair(id: "${pair}", block: {number: ${blockNumber}}) {
        token0 {
          id
        }
        token1 {
          id
        }
        reserve0
        reserve1
        reserveUSD
      }
    }`,
  },
})

const stringToBigInt = (str) => {
  const splitStr = str.split(".")
  const decimals = splitStr[1].slice(0, DECIMALS).padEnd(DECIMALS, "0")
  return BigInt(`${splitStr[0]}${decimals}`)
}

const getPrice = async (blockNumber) => {
  const {
    error,
      data: {
        errors,
        data,
      },
  } = await fetchPrice(blockNumber)
  if (error.error || errors) {
    throw Error("Unable to fetch price from subgraph")
  }
  const { pair: { token0: { id: token0 }, token1: { id: token1 }, reserve0, reserve1, reserveUSD } } = data
  const token0LC = token0.toLowerCase()
  const token1LC = token1.toLowerCase()
  if (token0LC !== token && token1LC !== token) {
    throw Error("Token not found as part of the pair")
  }
  const tokenReserveInUSD = stringToBigInt(reserveUSD) / 2n
  const tokenReserve = stringToBigInt(token0LC === token ? reserve0 : reserve1)
  return BigInt(10 ** DECIMALS) * tokenReserveInUSD / tokenReserve
}

const pickRandomBlock = () => {
  return blockNumber - Math.round(Math.random() * blockRange)
}

let prices = []
for (let i = 0; i < SAMPLE_SIZE; i++) {
  const price = await getPrice(pickRandomBlock())
  prices.push(price)
}

const midpoint = SAMPLE_SIZE % 2 === 0 ? SAMPLE_SIZE / 2 : (SAMPLE_SIZE + 1) / 2
const median = prices[midpoint]

return Functions.encodeUint256(median)
