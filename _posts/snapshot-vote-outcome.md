---
title: 'Fetch outcome of off-chain Snapshot.org vote'
summary: 'The function fetches the outcome of an off-chain Snapshot.org vote proposal using the GraphQL API. Takes into account if the vote has closed and has met quorum. Gas efficient solution for DAOs.'
date: '2023-02-11'
author:
  name: ChainLinkGod
  link: https://twitter.com/ChainLinkGod
---
const proposalID = args[0]

if (!proposalID) {
  throw Error("Proposal ID is required")
}

const config = {
  url: "https://hub.snapshot.org/graphql?",
  method: "POST",
  headers: {
    'content-type': 'application/json'
  },
  params: {
    operationName: "Proposal",
    query: `query Proposal {\n  proposal(id:"${proposalID}") {\n    id\n    votes\n   scores\n  choices\n  state\n  scores_total\n quorum\n}\n}`,
    variables: null,
  },
}

const response = await Functions.makeHttpRequest(config)

const state = response.data.data.proposal.state
const totalScore = response.data.data.proposal.scores_total
const quorum = response.data.data.proposal.quorum

if (state !== 'closed') {
  return Functions.encodeString('Vote not ended')
}

if (totalScore < quorum) {
  return Functions.encodeString('Quorum not met')
}

const scores = response.data.data.proposal.scores
const choices = response.data.data.proposal.choices
const highestIndex = scores.indexOf(Math.max(...scores));

return Functions.encodeString(choices[highestIndex])