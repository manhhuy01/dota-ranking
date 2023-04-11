const fetch = require ('node-fetch')
const fs = require('fs')
const { CURRENT_MMR, USER_ID } = require('./constants')
const allRankMatch = require('./data/allRankMatchSeason4.json');
const detailMatches = require('./data/detailMatches.json');


const writeData = (data) => new Promise((rs, rj)=> fs.writeFile('./data/mmr.json', JSON.stringify(data, null, 2), () => { rs() }));

const isWin = (match) => {
  const { players } = match;
  const user = players.find(player => player.account_id === +USER_ID);
  return user.win ? 1 : -1;
}

const isParty = (overviewMatch) => {
  return overviewMatch.party_size > 1 ? 20 : 30;
}

const run = async () => {
  let mmr = [CURRENT_MMR];
  for(let i = 0; i < allRankMatch.length; i+= 1) {
    const overviewMatch = allRankMatch[i];
    const detailMatch = detailMatches.find(match=>match.match_id === overviewMatch.match_id);
    let deltaMMR = isWin(detailMatch) * isParty(overviewMatch);
    mmr.push(mmr[mmr.length-1] - deltaMMR);
  }
  mmr.reverse();
  await writeData(mmr)
  console.log('finish ', mmr)
}

run();

