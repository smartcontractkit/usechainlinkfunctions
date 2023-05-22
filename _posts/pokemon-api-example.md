---
title: "Weight-Height results from Poke API"
summary: "This Function returns the Base Experience, Weight, Height of Pokemon. It uses the Poke API. Parameters includes name of pokemon."
date: "2023-05-22"
author:
  name: Naman Gautam
  link: https://github.com/Naman1729
---
// This function fetches Base Experience, Weight, Height of Pokemon results from Poke API
// Args include name of pokemon

const pokiURL = "https://pokeapi.co/api/v2/pokemon"

const pokemonCharacter = args[0]

console.log(`Sending HTTP request to ${pokiURL}/${pokemonCharacter}/`)

const pokiRequest = Functions.makeHttpRequest({
url: `${pokiURL}/${pokemonCharacter}`,
method: "GET",
})

// Execute the API request (Promise)
const pokiResponse = await pokiRequest

if (pokiResponse.error) {
console.error(pokiResponse.error)
throw Error("Request failed, try checking the params provided")
}

console.log(pokiResponse)

// gets the Base Experience, Weight, Height of Pokemon
const reqData = pokiResponse.data

// Gives the whole response from the request
console.log(reqData)

// result is in JSON object, containing Base Experience, Weight, Height of Pokemon
const myData = {
base_experience: reqData.base_experience,
weight: reqData.weight/10, // The weight of this Pokemon in hectograms which is converted into kilograms by dividing by 10
height: reqData.height/10, // The height of this Pokemon in decimetres which is converted into metres by dividing by 10
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(myData))
