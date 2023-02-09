---
title: 'Fetch and return available balance of Stripe account'
summary: 'This function will fetch Stripe account available balance of particular currency.'
date: '2023-02-09'
author:
  name: Karen Stepanyan
link: https://snipe24.t.me/
---

const apiKey = secrets.API_KEY
const balanceCurrency = args[0] || 'usd'

if (!apiKey ) {
throw Error("Stripe API Key is required")
}


const config = {
url: `https://${apiKey}@api.stripe.com/v1/balance`,
}

const response = await Functions.makeHttpRequest(config)

const balance = response.data.available.find(c => c.currency.toLowerCase() === balanceCurrency.toLowerCase())

const balanceInCents = Math.round(balance.amount * 100)

return Functions.encodeUint256(balanceInCents)
