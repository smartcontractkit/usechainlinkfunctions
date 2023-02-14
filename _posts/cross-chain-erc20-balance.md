---
title: 'Aggregate the ERC20 balance of an address across multiple chains'
summary: 'Find the balance of a user for a specific ERC20 token across the specified chains, and return the total balance. This balance, for example, could be used immediately in the callback function to approve or deny the user access to specific functions in the contract.'
date: '2023-02-14'
author:
  name: polarzero
  link: https://twitter.com/0xpolarzero
---
// https://github.com/polar0/cross-chain-ERC20-balance-verification/blob/main/implementation/verify-balances.js

// The address to check the balances of
const userAddress = args[0]
// The chains to check, formatted as:
// name:tokenAddress,name:tokenAddress...
const tokens = args[1].split(",").map((tokenAddress) => {
  const [chain, address] = tokenAddress.split(":")
  return { chain, address }
})

// Verify if there is indeed a secret (RPC URL) for each chain
tokens.forEach((token) => {
  if (!secrets[token.chain]) {
    throw new Error(`No secret found for chain ${token.chain}`)
  }
})

// Prepare requests for each chain
const requests = tokens.map((token, index) => {
  return Functions.makeHttpRequest({
    url: secrets[token.chain],
    method: "POST",
    data: {
      id: index,
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          to: token.address,
          // The signature of 'balanceOf(address)' + the user address without the 0x prefix
          data: "0x70a08231000000000000000000000000" + userAddress.slice(2),
        },
        "latest",
      ],
    },
  })
})

// Wait for all requests to finish
const responses = await Promise.all(requests)

// Parse responses
const balances = responses.map((response) => {
  // Convert the result to a number
  return parseInt(response.data.result, 16) ?? 0
})

// Sum all balances
const totalBalance = balances.reduce((a, b) => a + b, 0)

// Return the total balance of the user
return Functions.encodeUint256(totalBalance)