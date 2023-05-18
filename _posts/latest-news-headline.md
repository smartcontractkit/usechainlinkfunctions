---
title: 'Latest News Headline from NEWS API'
summary: "This Function returns the latest news headline for a particular country. It uses the NEWS API to get the news. Parameters include country code and keyword(if user want to filter search on the basis of keyword)"
date: '2023-05-18'
author:
  name: Shikhar Agarwal
  link: https://github.com/shikhar229169
---
// This function fetches the latest news headline from a country
// Args include country code and keyword(if any)
// If user don't want to filter result on the basis of keyword, just pass an empty string for keyword

if (!secrets.apiKey) {
  throw Error("Api Key Not Found")
}

const url = "https://newsapi.org/v2/top-headlines?"

const country = args[0]          // Example - "in" for India
const keywordSearch = args[1]    // Example - "web3"  (This arg is optional, leave an empty string)

console.log(`Sending HTTP GET Request to ${url}country=${country}&q=${keywordSearch}`)

const newsRequest = Functions.makeHttpRequest({
  url: url,
  method: "GET",
  headers: {
    "X-Api-Key": secrets.apiKey,
  },
  params: {
    country: country,
    q: keywordSearch,
  },
})

// Execute the API request (Promise)
const newsResponse = await newsRequest

// check if there was any error during the request
if (newsResponse.error) {
  throw Error("Request failed")
}

// get the latest news
const newsSelect = newsResponse.data.articles[0]

// choosing the required parameters to be uploaded
const newsData = {
  publishTime: newsSelect.publishedAt,
  title: newsSelect.title,
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(newsData))
