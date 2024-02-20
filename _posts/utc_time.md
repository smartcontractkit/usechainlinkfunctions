---
title: 'Fetch the UTC time'
summary: 'This function fetches the UTC timestamp from WorldTimeAPI.'
date: '2024-02-19'
author:
  name: Evan Drake
  link: https://twitter.com/iamevandrake
---
const config = {
  url: "https://worldtimeapi.org/api/timezone/Etc/UTC",
};

const response = await Functions.makeHttpRequest(config);

const datetime = response.data.utc_datetime;

return Functions.encodeString(datetime);
