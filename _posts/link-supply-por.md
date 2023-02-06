---
title: 'LINK non-circulating supply Proof of Reserves'
summary: 'This Function pulls all the reported Chainlink Foundation Non-Circulating Supply Wallets (provided by Chainlink Labs API). The API provides a list of wallets and reported reserves for each. Each time this application is invoked, we randomly select 1 wallet from the list. We then verify that the funds on-chain match the off-chain reported amount by Chainlink Foundation. We expect each time we run this check that the funds on-chain should match the API off-chain amount. More info on LINK circulation: https://supply.chain.link'
date: '2023-03-02'
author:
  name: BJ
  link: https://twitter.com/bryanjowers

---
let isPoRValid;

// Fetch off-chain list of addresses from Chainink with reported balances
const ChainlinkSupply = await Functions.makeHttpRequest({
    url: `https://supply.chain.link/supply`
});

if (!ChainlinkSupply.error) {

    console.log("\n\n\nTotal number of addresses reported: " + ChainlinkSupply.data.balances.length)

    // randomly select 1 wallet from the list retrieved from Chainlink API
    const randomAddressPicker = Math.floor(Math.random() * (ChainlinkSupply.data.balances.length + 1));
    const selectedWallet = ChainlinkSupply.data.balances[randomAddressPicker];
    const offChainBalance = selectedWallet.balance.toString(); // converted to string to avoid JS large number (exponential) comparison 
    console.log(selectedWallet.address + " (OFF-CHAIN balance):     " + selectedWallet.balance)

    // Get on-chain LINK balance for selected wallet via Alchemy
    const balanceCheck = await Functions.makeHttpRequest({
        url: `https://eth-mainnet.g.alchemy.com/v2/${secrets.ALCHEMY_KEY}`,
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
            id: 1,
            jsonrpc: '2.0',
            method: 'alchemy_getTokenBalances',
            params: [ChainlinkSupply.data.balances[randomAddressPicker].address, ['0x514910771af9ca656af840dff83e8264ecf986ca']] // dynamically query wallet, filtering for only LINK contract
        }
    });
    console.log(balanceCheck)
    if (!balanceCheck.error) {
        
        // Parse Alchemy API response which returns filtered LINK token balance for selected address
        const onChainBalance = BigInt(balanceCheck.data.result.tokenBalances[0].tokenBalance).toString();
        console.log(ChainlinkSupply.data.balances[randomAddressPicker].address + " (ON-CHAIN balance):      " + onChainBalance);

        // Do PoR check: is the off-chain reported token balance the same as the onchain actual token balance?
        isPoRValid = (onChainBalance === offChainBalance);
        console.log("\n==================\n PoR valid status\n==================")
        console.log(isPoRValid)
    }
}

// Returns 1 if PoR is valid
// Returns 0 if PoR is invalid
return Functions.encodeUint256(isPoRValid * 1);