---
title: 'Fetch result of soccer match from Sportsdata.io'
summary: 'The function fetches the result of soccer match. Required arguments are match date and abbreviations of team names'
date: '2023-02-13'
author:
  name: Karen Stepanyan
  link: https://snipe24.t.me/

---
// Chainlink function to get the winner of soccer match. Possible return values are abbreviations of team names or 'Draw'

const date = args[0] // Match date. basic date format YYYY-MM-DD. for example 2023-01-28
let teams = args[1] //  competing teams in following format TEAM1/TEAM2. for example AST/LEI

if (!secrets.soccerApiKey) {
  throw Error("Sportsdata.io API KEY is required")
}

const config = {
  url: `https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/${date}?key=${secrets.soccerApiKey}`
}

const response = await Functions.makeHttpRequest(config)

const allMatches = response.data;

const match = allMatches.find(match => {
  const playingTeams = `${match.AwayTeamKey}/${match.HomeTeamKey}`.toUpperCase()
  const playingTeamsReversed = `${match.HomeTeamKey}/${match.AwayTeamKey}`.toUpperCase()
  if (teams.toUpperCase() === playingTeams || teams.toUpperCase() === playingTeamsReversed) {
    return true
  }
})

if (!match) {
  throw new Error('Match not found for given arguments')
}

if (match.Winner === 'Scrambled') {
  throw new Error('Data is scrambled, use production API Key')
}

let result;

if (match.Winner === 'AwayTeam') {
  result = match.AwayTeamKey
} else if (match.Winner === 'HomeTeam') {
  result = match.HomeTeamKey
} else if (match.Winner === 'Draw') {
  result = 'Draw'
}

if (!result) {
  throw new Error('Could not get the winner team.')
}

return Functions.encodeString(result)
