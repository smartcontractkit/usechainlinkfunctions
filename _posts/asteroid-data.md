---
title: 'Asteroid Data from NASA API'
summary: "This Function returns the very first current close-approach data for asteroid in the given range of time and max distance"
date: '2023-05-17'
author:
  name: Naman Gautam
  link: https://github.com/Naman1729
---
// This API provides access to current close-approach data for asteroid and comets in JPL’s SBDB
// Args include des, date-min, date-max, dist-max
// des - only data for the object matching this designation (e.g., 2015 AB or 141P or 433)
// date-min - exclude data earlier than this date YYYY-MM-DD
// date-max - exclude data later than this date YYYY-MM-DD
// dist-max - exclude data with an approach distance greater than this (in AU)


const sbdbURL = "https://ssd-api.jpl.nasa.gov/cad.api?"

const des = args[0]
const dateMin = args[1]
const dateMax = args[2]
const maxDist = args[3]

console.log(`Sending HTTP request to ${sbdbURL}des=${des}&date-min=${dateMin}&date-max=${dateMax}&dist-max=${maxDist}`)

const sbdbRequest = Functions.makeHttpRequest({
  url: sbdbURL,
  method: "GET",
  params: {
    des: des,
    "date-min": dateMin,
    "date-max": dateMax,
    "dist-max": maxDist,
  },
})

// response from sbdb
const sbdbResponse = await sbdbRequest

if (sbdbResponse.error) {
  console.error(geoCodingResponse.error)
  throw Error("Request failed, try checking the params provided")
}

console.log(sbdbResponse)

// getting the very first data of an asteroid
const reqData = sbdbResponse.data.data[0]

// selecting the required output
const myData = {
  orbitId: reqData[1],
  closeTimeApproach: reqData[3],
  dist: reqData[4],
  relativeVelocity: reqData[7]
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(myData))
