const express = require('express');
const cors = require('cors');
const db = require('./db-connection');
const { Query } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 8000;

app.post('/submitProposal', async(req,res) =>{
  try {
    const title = req.body.title;
    const organization = req.body.organization;
    const amount_requested = req.body.amount_requested;
    const link = req.body.link;
    const description_text = req.body.description_text;
    await db.query(
      'INSERT INTO proposals (title, organization, amount_requested, link, description_text) VALUES ($1, $2, $3, $4, $5);', [title, organization,amount_requested,link,description_text],
    );
    res.send('Success')
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/post_comment', async (req, res) => {
  try {
    const timePosted = new Date();
    const userId = req.body.user_id;
    const commentText = req.body.comment_text;
    const proposalId = req.body.proposal_id;
    await db.query(
      'INSERT INTO comments (time_posted, user_id, comment_text, proposal_id) VALUES ($1, $2, $3, $4);', [timePosted, userId, commentText, proposalId],
    );
    res.send('Success');
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/get_comments', async (req, res) => {
  try {
    const proposalId = req.query.proposal_id;
    const query = await db.query(
      'SELECT * FROM comments WHERE proposal_id=$1;', [proposalId],
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getProposals', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM proposals;'
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/delete_proposal', async (req, res) => {
  try {
    const propsList = req.body.listOfIDs
    await db.query(
      `DELETE FROM proposals WHERE id IN (${propsList})`, 
    );
    res.send('Deleted selected proposals.');
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
    res.send(null);
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

// app.get('/getProposalDetails', async (req, res) => {
//   try {
//     console.log("idk it's not working>:(");
//     const query = await db.query(
//       'SELECT title, organization, amount_requested, link, description_text, deadline FROM proposals WHERE id=$1;',
//       [req.query.proposal_id]
//     );
//     console.log(query);
//     console.log(query.title);
//     console.log(query.rows);
//     res.send(query.rows[0]);
//   } catch (error) {
//     console.log("doesnt work for some reason");
//     console.log(error.stack);
//     res.send(null);
//   }
// });

app.get('/get_proposal_details', async (req, res) => {
  console.log("try pleaseeeee");
  try {
    const proposalId = req.query.proposal_id;
    const query = await db.query(
      'SELECT * FROM proposals WHERE id=$1;', [proposalId],
    );
    console.log(query.rows[0]);
    console.log(query.rows[0].title);
    console.log(query.rows[0]);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});// // // // // // // // // // // 