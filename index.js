const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors({
    origin: ['https://oea-vote.netlify.app', 'https://oea-search.netlify.app', 'https://oea-admin.netlify.app'],
    // origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
}));
require('dotenv').config();
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("long-lime-mussel-garbCyclicDB")
var { Parser } = require('json2csv')

app.post('/vote/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    // create an item in collection with key "leo"
    await votes.set(number, {vote:1});

    responseJson.status = "success";
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.post('/votes/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    await votes.item("votes").fragment(number).set({vote:1});

    responseJson.status = "success";
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.get('/vote/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes');
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

app.get('/votes', async (req, res) => {
    let responseJson = [];
    let votes = db.collection('votes');
    let votesItem = await votes.item("votes").fragments();
    for (var i = 0; i < votesItem.length; i++) {
        responseJson[i] = {"id": votesItem[i]};
    }

    const fields = [{
        label: 'OEA ID',
        value: 'id'
    }]

    const json2csv = new Parser({ fields: fields })

    try {
        const csv = json2csv.parse(responseJson)
        res.attachment('votes.csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
});

app.get('/votes/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    let item = await votes.item("votes").fragment(number).get();
    console.log("item", item);
    if (item[0] != null && item[0].props.vote == 1) {
        responseJson.status = "voted";
    } else {
        responseJson.status = "didn't vote";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.delete('/vote/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    let item = await votes.set(number, {vote:0});
    if (item != null) { d
        responseJson.status = "removed vote";
    } else {
        responseJson.status = "didn't remove vote";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.delete('/votes/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    await votes.item("votes").fragment(number).delete();
    responseJson.status = "removed vote";
	
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.post('/register/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    await votes.item("registered").fragment(number).set({registered:1});

    responseJson.status = "success";
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.get('/register', async (req, res) => {
    let responseJson = [];
    let votes = db.collection('votes');
    let registeredItem = await votes.item("registered").fragments();
    for (var i = 0; i < registeredItem.length; i++) {
        responseJson[i] = {"id": registeredItem[i]};
    }

    const fields = [{
        label: 'OEA ID',
        value: 'id'
    }]

    const json2csv = new Parser({ fields: fields })

    try {
        const csv = json2csv.parse(responseJson)
        res.attachment('registered.csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
});

app.get('/register/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    let item = await votes.item("registered").fragment(number).get();
    console.log("item", item);
    if (item[0] != null && item[0].props.registered == 1) {
        responseJson.status = "registered";
    } else {
        responseJson.status = "not registered";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.delete('/register/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    await votes.item("registered").fragment(number).delete();
    responseJson.status = "removed registered engineer";
	
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.post('/mobile/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;
    let mobile = req.body.mobile;
    console.log("mobile", mobile);

    await votes.item("mobile").fragment(number).set({"mobile":mobile});

    responseJson.status = "success";
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.get('/mobile', async (req, res) => {
    let responseJson = [];
    let votes = db.collection('votes');
    let mobileItem = await votes.item("mobile").fragments();
    for (var i = 0; i < mobileItem.length; i++) {
        let item = await votes.item("mobile").fragment(mobileItem[i]).get();
        responseJson[i] = {"id": mobileItem[i], "mobile": item[0].props.mobile};
    }

    const fields = [{
        label: 'OEA ID',
        value: 'id'
    },{
        label: 'Mobile',
        value: 'mobile'
    }]

    const json2csv = new Parser({ fields: fields })

    try {
        const csv = json2csv.parse(responseJson)
        res.attachment('mobile.csv')
        res.status(200).send(csv)
    } catch (error) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
});

app.get('/mobile/:number', async (req, res) => {
	let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    let item = await votes.item("mobile").fragment(number).get();
    console.log("item", item);
    if (item[0] != null && item[0].props.mobile != null) {
        responseJson.id = number;
        responseJson.status = item[0].props.mobile;
    } else {
        responseJson.status = "not updated";
    }
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

app.delete('/mobile/:number', async (req, res) => {
    let responseJson = {};
    let votes = db.collection('votes');
    const { number } = req.params;

    await votes.item("mobile").fragment(number).delete();
    responseJson.status = "removed mobile";
	
    res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(responseJson));
});

// Start the server
app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
