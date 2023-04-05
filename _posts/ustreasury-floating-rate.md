---
title: 'Get US Treasury Yield of specified maturity and interval'
summary: 'This example shows how to return the daily, weekly, and monthly US treasury yield of a given maturity timeline'
date: '2023-04-05'
author:
  name: Justin Gnoh
  link: https://github.com/justgnoh
---
// This function retrieves the latest released yield of the US X Year Treasury from the AlphaVantage API given a specific interval or maturity.
// Maturity timelines: 3month, 2year, 5year, 7year, 10year, 30year
// Interval options: daily, weekly, monthly
const maturity = args[0]
const interval = args[1]

if (!secrets.apiKey) {
  throw Error("Need to set Alpha Vantage API key");
}

// make HTTP request
const url = `https://www.alphavantage.co/query?function=TREASURY_YIELD`
console.log(`HTTP GET Request to ${url}&interval=${interval}&maturity=${maturity}`)

// construct the HTTP Request object. See: https://github.com/smartcontractkit/functions-hardhat-starter-kit#javascript-code
// params used for URL query parameters
const alphavantageRequest = Functions.makeHttpRequest({
  url: url,
  params: {
    interval: interval,
    maturity: maturity,
    apikey: secrets.apiKey
  },
})

// Execute the API request (Promise)
const alphavantageResponse = await alphavantageRequest
if (alphavantageResponse.error) {
  console.error(alphavantageResponse.error)
  throw Error("Request failed")
}

const data = alphavantageResponse["data"]
console.log(data);
// Gets the latest yield rate in the array of returned data values
const floatingRate = data.data[0].value;

if (data.Response === "Error") {
  console.error(data.Message)
  throw Error(`Functional error. Read message: ${data.Message}`)
}

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeUint256(Math.round(floatingRate * 100))