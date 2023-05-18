---
title: 'Date-Time results from Time API'
summary: "This Function returns the current Date, Time, TimeZone, DayOfWeek. It uses the Time API. Parameters includes latitude and longitude of the area."
date: '2023-05-18'
author:
  name: Naman Gautam
  link: https://github.com/Naman1729
---
// This function fetches the latest Date-Time results from Time API
// Args include longitude and latitude of your location

const TimeURL = "https://timeapi.io/api/Time/current/coordinate?"

const latitudeOfPos = args[0]
const longitudeOfPos = args[1]

console.log(`Sending HTTP request to ${TimeURL}latitude=${latitudeOfPos}&longitude=${longitudeOfPos}`)

const TimeRequest = Functions.makeHttpRequest({
  url: TimeURL,
  method: "GET",
  params: {
    latitude: latitudeOfPos,
    longitude: longitudeOfPos,
  },
})

// Execute the API request (Promise)
const TimeResponse = await TimeRequest

if (TimeResponse.error) {
  console.error(TimeResponse.error)
  throw Error("Request failed, try checking the params provided")
}

console.log(TimeResponse)

// gets the current data of Date, Time, TimeZone, DayOfWeek
const reqData = TimeResponse.data

// Gives the whole response from the request
console.log(reqData)


// result is in JSON object, containing Date, Time, TimeZone, DayOfWeek.
const myData = {
  date: reqData.date,
  time: reqData.time,
  timeZone: reqData.timeZone,
  dayOfWeek: reqData.dayOfWeek
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(myData))
