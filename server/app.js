const express = require('express');
const db = require('./db-connection');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Example endpoint that sends a try-catch wrapped query to the database
app.get('/test_db', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM users;',
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/submitVote', async (req, res) => {
  try {
    console.log(req.body);
    const query = await db.query(
      'INSERT INTO votes(vote, has_voted, user_id, proposal_id) VALUES ($1, $2, $3, $4)',
      [req.body.vote, true, req.body.user_id, req.body.proposal_id],
    );
    res.send('ok');
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getAllVotes', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT vote FROM votes WHERE proposal_id=$1',
      [req.body.proposal_id],
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getProposalDetails', async (req, res) => {
  try {
    console.log(req.query);
    const query = await db.query(
      'SELECT title, organization, amount_requested, link, description_text FROM proposals WHERE id=$1',
      [req.query.proposal_id],
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// Example endpoint that sends a try-catch wrapped query to the database
app.get('/test_db2', async (req, res) => {
  const name = 'Warren';
  try {
    const query = await db.query(
      'SELECT * FROM users WHERE username=$1;', [name],
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// Example endpoint that sends a try-catch wrapped query to the database
app.post('/test_db3', async (req, res) => {
  try {
    await db.query(
      'INSERT INTO users (id, is_admin, username) VALUES ($1, $2, $3);', ['5', true, 'SuperAdmin'],
    );
    res.send('Success');
  } catch (error) {
    console.log(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});