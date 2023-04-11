const fetch = require ('node-fetch')
const fs = require('fs')
const { USER_ID } = require('./constants')

fetch(`https://api.opendota.com/api/players/${USER_ID}/matches?significant=0`)
  .then((response) => response.json())
  .then(data => fs.writeFile('./data/allMatch.json', JSON.stringify(data, null, 2), () => {})).catch(function (err) {
    console.log("Unable to fetch -", err);
  });
