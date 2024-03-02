---
title: 'Proving you know a secret word.'
summary: "This Function proves if an address knows a secret word. The secret is kept as an off-chain secret, and the prover needs to submit their address as an argument which is checked if the msg.sender is the address. The hash of the user EOA and secret word must be provided to check in a secure manner in blockchain."
date: '2023-06-30'
author:
  name: Ege Aybars Bozkurt
  link: https://twitter.com/egeaybars1
---

const walletAddress = args[0]
const inputHash = args[1]

//Convert the secret word to hexadecimal format
//Only hexadecimal format is accepted in web3_sha3.
const stringToHex = (str) => {
  let hex = ""
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    const hexValue = charCode.toString(16)
    hex += hexValue.padStart(2, "0")
  }
  return hex
}

const hexSecret = stringToHex(secrets[0])

const addressWithSecret = walletAddress + hexSecret
console.log(addressWithSecret)
console.log(secrets[1])

const alchemyKeccakRequest = Functions.makeHttpRequest({
  url: secrets[1],
  method: "POST",
  data: {
    jsonrpc: "2.0",
    id: 1,
    method: "web3_sha3",
    params: [addressWithSecret],
  },
})

const [alchemyKeccakResponse] = await Promise.all([alchemyKeccakRequest])

const resultHash = alchemyKeccakResponse.data.result
console.log(resultHash)

if (resultHash === inputHash) {
  console.log("Address knows the secret")
  return Functions.encodeUint256(1)
} else {
  console.log("Address does not know the secret")
  return Functions.encodeUint256(0)
}