---
title: 'Read cross-chain information'
summary: 'The function reads the supply APY rate of depositing WETH into AaveV3 on Polygon'
date: '2023-02-12'
author:
  name: Patrick Collins
  link: https://twitter.com/PatrickAlphaC

---
// This example shows how to make a decentralized price feed using multiple APIs

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const contractAddress = args[0]
const encodedAbiFunctionCall = args[1]

if (
    !secrets.polygonKey
) {
    throw Error(
        "Need to set POLYGON_RPC_URL environment variable"
    )
}

// curl --data '{"method":"eth_call","params":[{"to":"0x794a61358D6845594F94dc1DB02A252b5b4814aD","data":"0x35ea6a750000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619"},"latest"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST $POLYGON_RPC_URL
// example response:
// {"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000003e80000069140000039cb03e805122904203a1f400000000000000000000000000000000000000000033e9fbcc201bc653e561a5300000000000000000000000000000000000000000002542e73dd9e8a5aecdb2a0000000000000000000000000000000000000000034895c6e6312a938da89522000000000000000000000000000000000000000000123f39e6ba5158357302ea0000000000000000000000000000000000000000004a723dc6b40b8a9a0000000000000000000000000000000000000000000000000000000000000063e965ca0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000e50fa9b3c56ffb159cb0fca61f5c9d750e8128c8000000000000000000000000d8ad37849950903571df17049516a5cd4cbe55f60000000000000000000000000c84331e39d6658cd6e6b9ba04736cc4c473435100000000000000000000000003733f4e008d36f2e37f0080ff1c8df756622e6f00000000000000000000000000000000000000000000000001e758ee6c676a3f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}

// To make an HTTP request, use the Functions.makeHttpRequest function
// Functions.makeHttpRequest function parameters:
// - url
// - method (optional, defaults to 'GET')
// - headers: headers supplied as an object (optional)
// - params: URL query parameters supplied as an object (optional)
// - data: request body supplied as an object (optional)
// - timeout: maximum request duration in ms (optional, defaults to 10000ms)
// - responseType: expected response type (optional, defaults to 'json')

// Ideally, you'd use multiple RPC URLs so we don't have to trust just one
const polygonReadRequest = Functions.makeHttpRequest({
    url: secrets.polygonKey,
    method: "POST",
    data: {
        "jsonrpc": "2.0",
        "method": "eth_call",
        "params": [
            { "to": contractAddress, data: encodedAbiFunctionCall },
            "latest"
        ],
        "id": 1
    }
})

// First, execute all the API requests are executed concurrently, then wait for the responses
const [polygonResponse] = await Promise.all([
    polygonReadRequest
])

console.log("raw response", polygonResponse)

// take the "0x" off the front of the hex string
const result = polygonResponse.data.result.slice(2)

// loop through result and convert each 64 characters to a number
const startingIndex = 64 * 2
const supplyApy = "0x" + result.slice(startingIndex, startingIndex + 64)

// convert the hex supplyApy to a number
const supplyApyNumber = parseInt(supplyApy, 16)
// This number is returned as a RAY, so we'd divide by 1e27, or 1e25 to get a percentage
console.log("WETH Supply APY on AaveV3 in Polygon: ", (supplyApyNumber / 1e25), "%")

// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the client smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
// return Functions.encodeUint256(Math.round(medianPrice * 100))
return Functions.encodeUint256(supplyApyNumber)

