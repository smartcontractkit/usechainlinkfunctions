---
title: MTA Bridge Toll Price Aggregated Median
summary: 'Adapted HTML GET request with XPATH scraping originally from the Universal Adapter for HighWei (Chainlink Spring 2022: Fair Price Tollbooth)'
date: '2023-07-25'
author:
  name: Marcus Wentz
  link: https://github.com/MarcusWentz
---
// Modified from https://github.com/MarcusWentz/HighWei/blob/main/scripts/AggregateScrapeTollMTAwithAdapter.js
// Can we use custom node.js libraries somehow?
// I tried: 
// npm i puppeteer
// but get error:
//__Error thrown in sandboxed source code__
//Cannot find module 'puppeteer'
//__Simulated On-Chain Response__
//Error message returned to client contract: "Cannot find module 'puppeteer'"

// const puppeteer = require('puppeteer');
// (async () => { // REMOVE IN ADAPTER.JS
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks', { waitUntil: 'networkidle2' });
//         const featureArticle1 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))[0];
//         const text1 = await page.evaluate(el => { return el.textContent}, featureArticle1);
//         const featureArticle2 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[3]/li[1]'))[0];
//         const text2 = await page.evaluate(el => { return el.textContent}, featureArticle2);
//         await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars', { waitUntil: 'networkidle2' });
//         const featureArticle3 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[1]/li[1]'))[0];
//         const text3 = await page.evaluate(el => { return el.textContent}, featureArticle3);
//         const featureArticle4 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[2]/li[4]'))[0];
//         const text4 = await page.evaluate(el => { return el.textContent}, featureArticle4);
//         const featureArticle5 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[3]/li[1]'))[0];
//         const text5 = await page.evaluate(el => { return el.textContent}, featureArticle5);
//         const featureArticle6 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[4]/li[1]'))[0];
//         const text6 = await page.evaluate(el => { return el.textContent}, featureArticle6);
//         const featureArticle7 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[4]/li[4]'))[0];
//         const text7 = await page.evaluate(el => { return el.textContent}, featureArticle7);
//         await browser.close();
//         let priceArray = [];
//         priceArray.push(text1.slice(10,text1.length)*100);
//         priceArray.push(text2.slice(10,text2.length)*100);
//         priceArray.push(text3.slice(13,text3.length)*100);
//         priceArray.push(text4.slice(37,text4.length)*100);
//         priceArray.push(text5.slice(11,text5.length)*100);
//         priceArray.push(text6.slice(11,text6.length)*100);
//         priceArray.push(text7.slice(30,text7.length)*100);
//         priceArray.sort(function(a, b){return a - b});
//         console.log(priceArray); // REMOVE IN ADAPTER.JS
//         let medianPrice = priceArray[Math.floor(priceArray.length/2)];
//         console.log(Math.round(medianPrice)); // REMOVE IN ADAPTER.JS
//         return BigInt(Math.round(medianPrice)); // BigInt to handle uint errors with Adapter.js
// })(); // REMOVE IN ADAPTER.JS

// Get request for raw HTML working but cannot XPATH scrape in a simple way without node.js library like puppeteer. 
// Question:
// Can
// Functions.makeHttpRequest
// return an object which can be XPATH scraped in a simple way?

// test()

// async function test(){

//     const pokiRequest = Functions.makeHttpRequest({
//         url: `https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks`,
//         method: "GET",
//         })
        
//     // Execute the API request (Promise)
//     const pokiResponse = await pokiRequest
//     const rawJsonBody = pokiResponse.data
//     console.log(rawJsonBody)
//     console.log(typeof(rawJsonBody))
//     // console.log(rawJsonBody.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]')[0])
//     // console.log(rawJsonBody.xpath('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))

// }


//
const totalAmountAfterInterest = 10

return Functions.encodeUint256(Math.round(totalAmountAfterInterest))


