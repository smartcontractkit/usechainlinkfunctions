---
title: 'Find the Best DEX Trade Value for a Given Asset Pair'
summary: 'This example shows how to return the best DEX trade value for a give asset pair using Paraswap DEX Aggregator'
date: '2023-02-13'
author:
  name: Max Melcher
  link: https://twitter.com/MaxwellMelcher
---
// Decimals can be passed from the token contract decimals() function
const srcToken = args[0] // Token source (selling)
const srcDecimals = args[1]
const destAsset = args[2] //Token destination (buying)
const destDecimals = args[3]
const amount = args[4] // Amount of source token to trade

// Pull from the Paraswap DEX Aggregator router
const paraswapRequest = await Functions.makeHttpRequest({
  url: `https://apiv5.paraswap.io/prices?srcToken=${srcToken}&srcDecimals=${srcDecimals}&destToken=${destAsset}&destDecimals=${destDecimals}&amount=${amount}&network=1`,
})

if (!paraswapRequest.error) {
  console.log("Optimal trade route found!")
  console.log(
    `Swap found to exchange ${
      10 ** -paraswapRequest.data.priceRoute.srcDecimals * parseInt(paraswapRequest.data.priceRoute.srcAmount)
    } of ${paraswapRequest.data.priceRoute.srcToken} into ${
      10 ** -paraswapRequest.data.priceRoute.destDecimals * parseInt(paraswapRequest.data.priceRoute.destAmount)
    } of ${paraswapRequest.data.priceRoute.destToken}`
  )
  //Sample Output: "Swap found to exchange 1 of 0x514910771af9ca656af840dff83e8264ecf986ca into 6.732330036871376 of 0x6b175474e89094c44da98b954eedeac495271d0f"
  console.log(`${paraswapRequest.data.priceRoute.bestRoute.length} best route(s) found:`)
  //If direct swap is found with one pool return that pool address
  if (paraswapRequest.data.priceRoute.bestRoute[0].percent == 100) {
    console.log(
      `One direct route found through ${paraswapRequest.data.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].exchange}`
    )
    //Sample Output: One direct route found through UniswapV2
    console.log(paraswapRequest.data.priceRoute.bestRoute[0].swaps[0].swapExchanges[0].data)
    /*
    Sample Output:
    {
      router: '0xF9234CB08edb93c0d4a4d4c70cC3FfD070e78e07',
      path: [
        '0x514910771af9ca656af840dff83e8264ecf986ca',
        '0x6b175474e89094c44da98b954eedeac495271d0f'
      ],
      factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      initCode: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      feeFactor: 10000,
      pools: [
        {
          address: '0x6D4fd456eDecA58Cf53A8b586cd50754547DBDB2',
          fee: 30,
          direction: true
        }
      ],
      gasUSD: '2.735657'
    }
    */
  }
} else {
  console.log("Paraswap Request error")
  console.log({ ...paraswapRequest })
}
return Functions.encodeUint256(parseInt(paraswapRequest.data.priceRoute.destAmount))