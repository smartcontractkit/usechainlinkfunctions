---
title: 'Finanical metric data for dApps and blockchains sourced from Token Terminal'
summary: 'This Function fetches metric data from the Token Terminal API for a specific project. Supported metrics include revenue, fees, earnings, active users, TVL, volume, supply, and more. Projects includes both dApps and blockchains. Optional parameter for specific date. Requires Token Terminal Pro subscription to obtain API key.'
date: '2023-02-11'
author:
  name: ChainLinkGod
  link: https://twitter.com/ChainLinkGod

---

const metric = args[0] // valid metric id that can be found on https://api.tokenterminal.com/v2/metrics
const project = args[1] // project id
const date = args[2] // optional date. format YYYY-MM-DD. For example 2023-02-10
const apiKey = secrets.API_KEY;


if (!apiKey) {
  throw Error("Tokenterminal API Key is required")
}

const config = {
  url: `https://api.tokenterminal.com/v2/metrics/${metric}?project_ids=${project}`,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
}

const response = await Functions.makeHttpRequest(config)
if (response.error) {
  throw new Error(response.response.data.message)
}

let data;
if (date) {
  data = response.data.data.find(d => d.timestamp.includes(date))
}else {
  data = response.data.data[0]
}
const result = Math.round(data.value * 100)

return Functions.encodeUint256(result)
