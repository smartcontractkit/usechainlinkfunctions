---
title: 'Entity for an address from the Arkham API'
summary: "This Function returns the entity ID of a given address. The entity ID is a string, and represents a slugified version of the entity's name. For example, Binance -> binance. The address is the only required parameter, and an API key is the only required secret."
date: '2023-10-27'
author:
  name: Arkham Team
  link: https://arkhamintelligence.com/
---
// This Function returns the entity ID of the input address. Entity IDs are strings representing
// slugified version of the entity's name. They can be used in other functions to Arkham's API if
// you'd like to find more information about the entity and its on-chain footprint.

const address = args[0]

// Validate address input.
if (address.length != 42) {
  throw Error("invalid address")
}

// Validate required secret.
if (!secrets.ARKHAM_API_KEY) {
  throw Error("api key required")
}

// Make the request to the /intelligence/address/:address/all endpoint.
const url = `https://api.arkhamintelligence.com/intelligence/address/${address}/all`
const resp = await Functions.makeHttpRequest({url, headers: {'API-Key': secrets.ARKHAM_API_KEY}})
const data = resp["data"]
if (resp.error) {
  console.error(error)
  throw Error("Request failed")
}

// Since we used the /all endpoint, we get data in the form of a chain map (see const declaration).
// In very rare cases, an address will have a different entity based on the chain. In those cases,
// you can choose which chain you'd like to privilege.
let entityId = ""
for (const [chain, intel] of Object.entries(data).sort()) { // Sort so that output is deterministic.
  // Choose the chain with the first non-null arkhamEntity field.
  if (intel.arkhamEntity !== undefined) {
    entityId = intel.arkhamEntity.id
    break
  }
}

return Functions.encodeString(entityId)
