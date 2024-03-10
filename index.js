const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();
const https = require("https");
const DynamoDB = require("cyclic-dynamodb")

// Initialize DynamoDB
const db = new DynamoDB({
    region: 'us-west-2', // Change this to your desired AWS region
    endpoint: 'http://localhost:8000', // DynamoDB local endpoint for testing
});

// Create a collection for storing integers
db.createTable('Votes', ['number'], { readCapacity: 1, writeCapacity: 1 });

app.use(express.json());

// POST API to register numbers in the DB
app.post('/vote', async (req, res) => {
    const { number } = req.body;
    if (!Number.isInteger(number)) {
      return res.status(400).json({ error: 'Invalid integer' });
    }
  
    try {
      await db.putItem('Votes', { number });
      res.json({ message: 'Vote appended successfully' });
    } catch (error) {
      console.error('Error appending integer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// GET API to check if a number exists in the DB
app.get('/vote/:number', async (req, res) => {
    const { number } = req.params;

    try {
      const item = await db.getItem('Votes', { number: parseInt(number) });
      const exists = !!item;
      res.json({ exists });
    } catch (error) {
      console.error('Error checking vote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
