---
title: "Obtain outcome of off-chain vote"
summary: "This function fetches the final outcome of an off-chain vote on the Snapshot.org platform"
date: "2023-02-10"
author:
  name: mykcryptodev
  link: https://twitter.com/mykcryptodev
---

const proposalId = args[0]

// Use snapshot's graphql API to get the final vote outcome
const snapshotRequest = () => Functions.makeHttpRequest({
  url: `https://hub.snapshot.org/graphql`,
  method: "POST",
  data: {
    query: `{
      proposal(id: "${proposalId}") {
        choices
        scores
        scores_state
      }
    }`,
  },
})

const { data, error } = await snapshotRequest()

if (error) {
  throw Error("Snapshot request failed")
}

const { proposal } = data.data
const { choices, scores, scores_state } = proposal

if (scores_state !== "final") {
  throw Error("Snapshot vote is not final")
}

const winningChoice = choices[scores.indexOf(Math.max(...scores))]
return Functions.encodeString(winningChoice)
