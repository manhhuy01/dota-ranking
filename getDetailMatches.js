const fetch = require ('node-fetch')
const fs = require('fs')
const { USER_ID } = require('./constants')
const allRankMatch = require('./data/allRankMatchSeason4.json');
const detailMatches = require('./data/detailMatches.json');


const getMatchDetail = (matchId) => new Promise((rs,rj)=> fetch(`https://api.opendota.com/api/matches/${matchId}`)
.then((response) => response.json())
.then(data => rs(data)).catch(rj));

const writeData = (data) => new Promise((rs, rj)=> fs.writeFile('./data/detailMatches.json', JSON.stringify(data, null, 2), () => { rs() }));

const run = async () => {
  console.log(detailMatches.length, allRankMatch.length)
  for(let i = 0; i < allRankMatch.length; i+= 1) {
    if(!detailMatches.find(match => match.match_id === allRankMatch[i].match_id)){
      try {
        let newMatch = await getMatchDetail(allRankMatch[i].match_id);
        detailMatches.push(newMatch);
        console.log('done ',i, allRankMatch[i].match_id)
      } catch(err){
        console.log(err)
      }
    }
    if(i > 0 && i % 50 == 0) {
      await writeData(detailMatches)
    }
  }
  await writeData(detailMatches)
  console.log('finish ',detailMatches.length)
}

run();

