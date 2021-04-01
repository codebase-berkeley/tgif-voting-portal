const express = require('express');
const db = require('./db-connection');
require('dotenv').config();

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

//Example endpoint that sends a try-catch wrapped query to the database
app.get('/test_db', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM users;'
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/submitVote', async (req, res) => {
  try {
    console.log("Submit vote...")
    const query = await db.query(
      "INSERT INTO votes(vote, has_voted, userid, proposal_id)"
    );
  } catch (error) {
    console.log(error.stack);
  }
})

app.get('/getAllVotes', async (req, res) => {
  try {
    const query = await db.query(
      "insert query"
    );
  } catch (error) {
    console.log(error.stack);
  }
})

app.get('/getProposalDetails', async (req, res) => {
  try {
    const query = await db.query(
      "insert query"
    );
  } catch (error) {
    console.log(error.stack);
  }
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});