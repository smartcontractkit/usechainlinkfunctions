---
title: 'US election results from AP (Associated Press) API'
summary: "This functions returns the winner of the US election for a given date. It uses the AP (Associated Press) API to get the results. The date is the only required parameter. API key is the only required secret."
date: '2023-02-15'
author:
  name: Karen Stepanyan
  link: https://snipe24.t.me/
---
// Chainlink Function to get election results from AP (Associated Press) API. Date and API key are the only required parameters

const getReportingUnit = (reportingUnits, statePostal) => {
const level = statePostal === 'US' ? 'national' : 'state'
const reportingUnit = reportingUnits.find((ru) => ru.level === level)
if (!reportingUnit) {
throw new Error('Cannot find reporting unit')
}
return reportingUnit
}

const getReportingUnitWinner = (reportingUnit) => {
for (const candidate of reportingUnit.candidates) {
if (candidate.winner === 'X') {
return candidate
}
}
throw new Error('Candidate not found')
}


const date = args[0] // The date of the election formatted as YYYY-MM-DD
const statePostal = args[1] // The state's two-letter code e.g CO. `US` to get the results of a nationwide election
const raceID = args[2] // AP-assigned race ID. Should be used with `statePostal`
const raceType = args[3] || 'G' // The race type the election is for. The race type can be `D(Dem Primary)`, `R(GOP Primary)`, `G(General)`, `E(Dem Caucus)`, `S(GOP Caucus)`, `X(Open Primary or special use cases)`
const resultsType = args[4] || 'L' // The type of results to return. `L` for live results, `T` for test results

if (!secrets.apikey) {
throw new Error('Missing AP API key')
}

const params = {
level:  statePostal === 'US' ? 'national' : 'state',
raceTypeID: raceType,
format: 'json',
winner: 'X',
resultsType: resultsType,
apikey: secrets.apikey,
}

if ((statePostal && !raceID) || (!statePostal && raceID)) {
throw new Error('Both statePostal and raceID are required if one is provided')
}

if (statePostal) {
params.statePostal = statePostal
}

if (raceID) {
params.raceID = raceID
}

const config = {
url: `https://api.ap.org/v3/elections/${date}`,
params
}

const response = await Functions.makeHttpRequest(config)

const races = response.data.races
if (races.length === 0) {
throw new Error('Could not find any races')
}
if (races.length > 1) {
throw new Error('Finding the winner from multiple races is not supported')
}

const race = races[0]
const reportingUnit = getReportingUnit(race.reportingUnits, statePostal)
const raceWinner = getReportingUnitWinner(reportingUnit)


return Functions.encodeString(JSON.stringify(raceWinner))