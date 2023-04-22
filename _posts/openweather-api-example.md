---
title: 'Current Temperature results from openweather API'
summary: "This Function returns the current temperature in an area. It uses the openweather API. Parameters include latitude, longitude of the location, along with the apiKey, and units to get the temperature in Kelvin, Celsius or Fahrenheit"
date: '2023-04-18'
author:
  name: Shikhar Agarwal
  link: https://github.com/shikhar229169
---
// This function fetches the latest temperature for a particular area from openweathermap API
// latitude, longitude
// units- unit in which we want the temperature (standard, metric, imperial)


if (!secrets.apiKey) {
  throw Error("Weather API Key is not available!");
}

const latitude = args[0]
const longitude = args[1]
const unit = args[2]

const url = `https://api.openweathermap.org/data/2.5/weather?`

console.log(`Sending HTTP request to ${url}lat=${latitude}&lon=${longitude}&units=${unit}`)

const weatherRequest = Functions.makeHttpRequest({
  url: url,
  method: "GET",
  params: {
    lat: latitude,
    lon: longitude,
    appid: secrets.apiKey,
    units: unit
  }
})

// Execute the API request (Promise)
const weatherResponse = await weatherRequest
if (weatherResponse.error) {
  console.error(weatherResponse.error)
  throw Error("Request failed, try checking the params provided")
}

// gets the current temperature
const temperature = weatherResponse.data.main.temp

// Gives the whole response from the request
console.log("Weather response", weatherResponse)

// result is in JSON object, containing only temperature
const result = {
  temp: temperature
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(result))
