---
title: "Learn a new cat fact"
summary: "This Function returns a random fact about cats from catfact.ninja"
date: "2024-04-15"
author:
  name: Junaid
  link: https://github.com/sophon314
---
// Set the URL
const config = {
  url: "https://catfact.ninja/fact",
};

//Get the response
const response = await Functions.makeHttpRequest(config);

// Send the repsonse upstairs
return Functions.encodeString(response.data.fact);
