---
title: 'Google Maps Distance Matrix API'
summary: "This function returns the distance and duration of a trip between two locations using the Google Maps Distance Matrix API. The origin and destination are required parameters. A Google Maps API key is also required and must be set as a secret."
date: '2023-03-29'
author:
  name: Karim Hadni
  link: https://twitter.com/Karim_Hadni
---
// Define constants for the API endpoint and request parameters
const API_ENDPOINT = "https://maps.googleapis.com/maps/api/distancematrix/json"
const DEPARTURE_TIME = "now"
const RETURN_PROPERTIES = ["distance", "duration", "duration_in_traffic"]

// Get the arguments from the request config
const origin = args[0] // e.g. "New York City"
const destination = args[1] // e.g. "Washington DC"

// Get the Google Maps API Key from the environment variables
const apiKey = secrets.apiKey
if (
  !apiKey ||
  apiKey ===
    "Your Google Maps API key (get one: https://developers.google.com/maps/documentation/distance-matrix/start)"
) {
  throw new Error("GOOGLE_MAPS_API_KEY environment variable not set or invalid")
}

// build HTTP request object
const requestParams = {
  url: `${API_ENDPOINT}?departure_time=${DEPARTURE_TIME}`,
  params: {
    origins: origin,
    destinations: destination,
    key: apiKey,
  },
}

// Make the HTTP request to the Google Maps API
const googleMapsRequest = Functions.makeHttpRequest(requestParams)
let response

try {
  response = await googleMapsRequest
} catch (error) {
  throw new Error(`Google Maps API request failed: ${error.message}`)
}

// Check if the response status is OK
if (response.status !== 200) {
  throw new Error(`Google Maps API returned an error: ${response.statusText}`)
}

// Extract the relevant data from the response
const data = response.data

// Check if the response contains the expected properties
if (!data.rows || !data.rows[0].elements || !data.rows[0].elements[0]) {
  throw new Error("Google Maps API response is missing expected data")
}

// Extract the distance, standard duration, and duration in traffic from the response
const distance = data.rows[0].elements[0].distance.value
const stdDuration = data.rows[0].elements[0].duration.value
const duration_in_traffic = data.rows[0].elements[0].duration_in_traffic.value

// Log the results for debugging purposes
console.log(`Distance: ${distance / 1000} km`)
console.log(`std duration: ${stdDuration / 60} min`)
console.log(`duration_in_traffic: ${duration_in_traffic / 60} min`)
console.log(`time in traffic jam: ${(duration_in_traffic - stdDuration) / 60} min`)

// Encode and return the distance (in meters), standard duration (in seconds), and duration in traffic (in seconds) as a string which can be parsed and split
return Functions.encodeString(`${distance},${stdDuration},${duration_in_traffic}`)
