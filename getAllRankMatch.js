const fs = require('fs');
const allMatch = require('./data/allMatch.json');

if (allMatch) {
  const allRankMatch = allMatch.filter(match => match.game_mode = 22 && match.lobby_type == 7);
  console.log('length', allRankMatch.length)
  fs.writeFile('./data/allRankMatch.json', JSON.stringify(allRankMatch, null, 2), () => {});
} else {
  throw new Error('no match')
}