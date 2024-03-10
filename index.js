const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();
const https = require("https");
const CyclicDb = require("cyclic-dynamodb")
const db = CyclicDb("long-lime-mussel-garbCyclicDB")

const table = db.table('Votes');

app.use(express.json());

// POST API to register numbers in the DB
app.post('/vote', async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: 'Number is required' });
  }

  try {
    // await db.putItem('Votes', { number });
    await table.putItem({number});
    res.json({ message: 'Number registered successfully' });
  } catch (error) {
    console.error('Error registering number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET API to check if a number exists in the DB
app.get('/vote/:number', async (req, res) => {
  const { number } = req.params;

  try {
    // const item = await db.getItem('Votes', { number });
    const item = await table.getItem({ number });
    const exists = !!item;
    res.json({ exists });
  } catch (error) {
    console.error('Error checking number:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
