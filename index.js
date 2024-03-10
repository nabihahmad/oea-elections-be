const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors({
    origin: 'https://oea-vote.netlify.app',
}));
require('dotenv').config();
const https = require("https");
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("long-lime-mussel-garbCyclicDB")

app.post('/vote/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes')
    const { number } = req.params;

    // create an item in collection with key "leo"
    await votes.set(number, {vote:1})

    responseJson.status = "success";
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.get('/vote/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes')
    const { number } = req.params;

    let item = await votes.get(number)
    console.log("item", item);
    if (item != null && item.props.vote == 1) {
        responseJson.status = "voted";
    } else {
        responseJson.status = "didn't vote";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.delete('/vote/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes')
    const { number } = req.params;

    let item = await votes.set(number, {vote:0})
    if (item != null) {
        responseJson.status = "removed vote";
    } else {
        responseJson.status = "didn't remove vote";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
