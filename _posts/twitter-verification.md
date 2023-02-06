---
title: 'Twitter account verification with an Ethereum address'
summary: "Check if a Twitter account belongs to a specific Ethereum address. This example uses the Twitter API to retrieve a user's recent tweets, and checks if they tweeted a specific message containing their address. It provides the arguments and returns the result via Chainlink Functions, which allows for prior validation of the user's ownership of the address via a signature or other method, thus performing a secure and non-intrusive verification."
date: '2023-03-02'
author:
  name: polarzero
  link: https://twitter.com/0xpolarzero
---
// https://github.com/polar0/twitter-verifier-chainlink-functions/blob/main/implementation/twitter-verification/functions/Functions-request-source.js

// Get the arguments from the request config
const twitterUsername = args[0]; // e.g. 'TwitterDev'
const ethereumAddress = args[1]; // e.g. '0x1234567890123456789012345678901234567890'
// The string that must be included in the latest tweets of the user for the verification to pass
const requiredStringIncluded = `Verifying my Twitter account for ${ethereumAddress}`;
// How many tweets to check (min 5, max 100)
const MAX_RESULTS = 10;

// Initialize the result to -1 (error)
let result = -1;

// Get the bearer token from the environment variables
if (!secrets.apiKey) {
  throw Error(
    'TWITTER_BEARER_TOKEN environment variable not set for Twitter API. Get a free one: https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens',
  );
}

// Don't even try if the username or address is empty
if (!twitterUsername || !ethereumAddress) {
  throw Error('Twitter username or Ethereum address is empty');
}

// Prepare the API requests
const twitterRequest = {
  // Get the user id from the provided username
  userIdByUsername: () =>
    Functions.makeHttpRequest({
      url: `https://api.twitter.com/2/users/by/username/${twitterUsername}`,
      headers: { Authorization: `Bearer ${secrets.apiKey}` },
    }),
  // Get the latest n tweets from the user (n = MAX_RESULTS)
  lastTweetsByUserId: (userId) =>
    Functions.makeHttpRequest({
      url: `https://api.twitter.com/2/users/${userId}/tweets?max_results=${MAX_RESULTS}`,
      headers: { Authorization: `Bearer ${secrets.apiKey}` },
    }),
};

// First, request the user id from their username
const idRes = await new Promise((resolve, reject) => {
  twitterRequest.userIdByUsername().then((res) => {
    if (!res.error) {
      resolve(res);
    } else {
      reject(res);
    }
  });
});

if (idRes.error) {
  throw Error('Twitter API request failed - coult not get user id');
}

// Grab the user id
const userId = idRes.data.data.id || null;

// Let's be extra careful and make sure the user id is not null
if (!userId) {
  throw Error('Twitter API request failed - user id is null');
}

// Then, request the latest tweets
const tweetsRes = await new Promise((resolve, reject) => {
  twitterRequest.lastTweetsByUserId(userId).then((res) => {
    if (!res.error) {
      resolve(res);
    } else {
      reject(res);
    }
  });
});

if (tweetsRes.error) {
  throw Error('Twitter API request failed - coult not get tweets');
}

// It'll only get here if the request was successful
const tweets = tweetsRes.data.data;
const tweetTexts = tweets.map((tweet) => tweet.text);
// Check if any of these tweets include the required string
const res = tweetTexts.some((text) =>
  text.toLowerCase().includes(requiredStringIncluded.toLowerCase()),
);
// If it found the string, return 1, otherwise 0
result = res ? 1 : 0;

// `result` can either be:
// - 1 (verified)
// - 0 (not verified)
// - -1 (if by any chance no error was thrown, yet it could not verify)

// Return the result along with the username and address, which can be parsed and split
return Functions.encodeString(
  `${result},${twitterUsername},${ethereumAddress}`,
);

