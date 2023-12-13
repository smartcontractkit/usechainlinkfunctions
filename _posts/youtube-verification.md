---
title: 'Verify video or channel with an EVM wallet address'
summary: "This function will be returned a result in uinit256. Return 1 if found the owner wallet address in video/channel description, return 0 if not found."
date: '2023-12-13'
author:
  name: Viet Nguyen
  link: https://github.com/vietndt
---

// Begin Function
// args = [videoOrChannelId, ownerWalletAddress, type]
const videoOrChannelId = args[0]; // video or channel id get from youtube
const ownerWalletAddress = args[1]; // owner wallet address
const type = args[2]; // "video" | "channel"

if (!secrets.apiKey) {
  throw Error(
    "YOUTUBE_API_KEY required"
  );
}

// Youtube API request
const youtubeRequest = Functions.makeHttpRequest({
  url: `https://youtube.googleapis.com/youtube/v3/${type}s``,
  method: "GET",
  params: {
    part: "snippet",
    id: videoOrChannelId,
    key: secrets.apiKey
  },
});

const youtubeResponse = await youtubeRequest;

if (youtubeResponse.error) {
  throw new Error("Youtube error");
}

// Checking youtube response if `!youtubeResponse.data.items[0]` -> Youtube video or channel not found
if (youtubeResponse.data && youtubeResponse.data.items && youtubeResponse.data.items[0]) {
  const description = youtubeResponse.data.items[0].snippet.description.toLowerCase();
  const walletIndex = description.indexOf(ownerWalletAddress.toLowerCase());
  // If it found owner wallet address return 1, otherwise 0
  const resultInt = walletIndex !== -1 ? 1 : 0;
  return Functions.encodeUint256(resultInt);
} else {
  throw new Error("Youtube video or channel not found");
}
// End Function
