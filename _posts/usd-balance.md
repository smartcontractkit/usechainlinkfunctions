---
title: 'Account $ balance'
summary: "This function returns the USD balance of an account using the Zerion wallet tracker."
date: '2023-05-16'
author:
  name: Benjamin
  link: https://twitter.com/bxmmm1
---
if (!secrets.zerionApiKey) {
    throw Error('API_KEY');
}

async function fetchBalanceFromZerion(address) {
    const config = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Basic ${secrets.zerionApiKey}`
        },
        url: `https://api.zerion.io/v1/wallets/${address}/portfolio/?currency=usd`
    };

    const response = await Functions.makeHttpRequest(config);

    if (response.error) {
        throw new Error(response.response.data.message);
    }

    const upscaledUSDValue = response.data.data.attributes.total.positions * 10 ** 18;

    return upscaledUSDValue;
}

const address = args[0];
const balance = await fetchBalanceFromZerion(address);

return Functions.encodeUint256(balance);

// Gas usage can be reduced by using a minified version. Please remove the code above this line and uncomment the code below.

// if(!secrets.zerionApiKey)throw Error("API_KEY");async function fetchBalanceFromZerion(e){let t={method:"GET",headers:{accept:"application/json",authorization:`Basic ${secrets.zerionApiKey}`},url:`https://api.zerion.io/v1/wallets/${e}/portfolio/?currency=usd`},a=await Functions.makeHttpRequest(t);if(a.error)throw Error(a.response.data.message);let o=1e18*a.data.data.attributes.total.positions;return o}const address=args[0],balance=await fetchBalanceFromZerion(address);return Functions.encodeUint256(balance);