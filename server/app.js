const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db-connection');

const app = express();
const port = 8000;
app.use(cors());

// Enable body parser
app.use(express.json());

app.post('/post_comment', async (req, res) => {
  try {
    const timePosted = new Date();
    const userId = req.query.user_id;
    const commentText = req.body.comment_text;
    const proposalId = req.query.proposal_id;
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
