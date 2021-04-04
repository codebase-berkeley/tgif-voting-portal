const express = require('express');
const cors = require('cors');
const db = require('./db-connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
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
    const deleteEntry = await db.query(
      'DELETE FROM votes WHERE user_id=$1 AND proposal_id=$2',
      [req.body.user_id, req.body.proposal_id],
    );
    const query = await db.query(
      'INSERT INTO votes(vote, user_id, proposal_id) VALUES ($1, $2, $3)',
      [req.body.vote, req.body.user_id, req.body.proposal_id],
    );
    res.send('Submitted vote...');
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getAllVotes', async (req, res) => {
  try {
    const amountYesQuery = await db.query(
      'SELECT COUNT(*) FROM votes WHERE proposal_id=$1 AND vote=TRUE;',
      [req.query.proposal_id],
    );

    const totalVotesQuery = await db.query(
      'SELECT COUNT(*) FROM votes WHERE proposal_id=$1',
      [req.query.proposal_id],
    );

    const totalUsersQuery = await db.query(
      'SELECT COUNT(*) FROM users',
    );

    res.send(
      {
        amountYes: parseInt(amountYesQuery.rows[0].count),
        totalVotes: parseInt(totalVotesQuery.rows[0].count),
        totalUsers: parseInt(totalUsersQuery.rows[0].count),
      },
    );
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getProposalDetails', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT title, organization, amount_requested, link, description_text, deadline FROM proposals WHERE id=$1;',
      [req.query.proposal_id],
    );
    res.send(query.rows[0]);
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
