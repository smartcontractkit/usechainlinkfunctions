---
title: 'Current Flight Status from Aviation Stack API'
summary: "This Function returns the current flight status for a particular flight. It uses the aviation stack API to get the information of the flight. Parameters include airline iata and flight number"
date: '2023-05-12'
author:
  name: Shikhar Agarwal
  link: https://github.com/shikhar229169
---
// This function fetches the latest flight status for a particular flight
// Args include the airline iata and flight number.
// Example - for indigo, airline iata is 6E

if (!secrets.apiKey) {
  throw Error("Aviation API Key is not available!")
}

// make HTTP request
const url = 'http://api.aviationstack.com/v1/flights?';
const airlineIata = args[0]  // example - "6E" airline iata for indigo
const flightNum = args[1]    // example - "123" flight number for indigo

console.log(`HTTP GET Request to ${url}airline_iata=${airlineIata}&flight_number=${flightNum}`)


const flightrequest = Functions.makeHttpRequest({
    url: url,
    method: "GET",
    params: {
      airline_iata: airlineIata,
      flight_number: flightNum,
      access_key: secrets.apiKey
    },
})

// Execute the API request (Promise)
const flightResponse = await flightrequest

if (flightResponse.error) {
  throw Error("Request failed")
}

// to get the latest data for flight
const latestFlightData = flightResponse.data.data[0]
console.log(latestFlightData)

// bundle of all the required data in flightData object
const flightData = {
  date: latestFlightData.flight_date,
  status: latestFlightData.status,
  departureAirport: latestFlightData.departure.airport,
  departureTime: latestFlightData.departure.actual || latestFlightData.departure.estimated || latestFlightData.departure.scheduled,
  arrivalAirport: latestFlightData.arrival.airport,
  arrivalTime: latestFlightData.arrival.actual || latestFlightData.arrival.estimated || latestFlightData.arrival.scheduled
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(flightData))