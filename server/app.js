const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('./db-connection');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
const port = 8000;

const GOOGLE_CLIENT_ID = process.env.GOOGLECLIENT;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLESECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // QUERY FOR USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const query = await db.query(
        'SELECT email FROM users',
      );
      for (let i = 0; i < query.rows.length; i += 1) {
        if (query.rows[i].email === profile.emails[0].value) {
          return done(null, profile);
        }
      }
      return done(null, false);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.displayName);
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/fail' }), (req, res) => res.redirect('http://localhost:3000/dashboard'));

app.get('/auth/google/fail',
  (req, res) => res.redirect('http://localhost:3000/login-fail'));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

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

app.post('/addUser', async (req, res) => {
  try {
    const { privileges } = req.body;
    const { username } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    await db.query(
      'INSERT INTO users (privileges, username, email, tgif_role) VALUES ($1, $2, $3, $4);', [privileges, username, email, role],
    );
    res.send('Added User');
  } catch (error) {
    console.log(error.stack);
  }
});

app.delete('/deleteUsers', async (req, res) => {
  try {
    const idsToDelete = req.body.listOfIds;
    const queryList = idsToDelete.toString();

    await db.query(
      `DELETE FROM comments WHERE user_id IN (${queryList})`,
    );

    await db.query(
      `DELETE FROM votes WHERE user_id IN (${queryList})`,
    );

    await db.query(
      `DELETE FROM users WHERE id IN (${queryList})`,
    );

    res.send('Deleted All Selected Users');
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getMembers', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM users;',
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getUserVotes', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT user_id, COUNT(*) FROM votes GROUP BY user_id;',
    );
    res.send(query.rows);
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

app.get('/getProposalCount', async (req, res) => {
  try {
    const proposalCount = await db.query(
      'SELECT COUNT(*) FROM proposals',
    );
    res.send(proposalCount.rows[0].count);
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

    const votingMember = 'Voting Member';
    const totalVotingMembersQuery = await db.query(
      'SELECT COUNT(*) FROM users WHERE privileges=$1', [votingMember],
    );

    res.send(
      {
        amountYes: parseInt(amountYesQuery.rows[0].count),
        totalVotes: parseInt(totalVotesQuery.rows[0].count),
        totalVotingMembers: parseInt(totalVotingMembersQuery.rows[0].count),
      },
    );
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/getProposalDetails', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT title, organization, amount_requested, link, description_text FROM proposals WHERE id=$1;',
      [req.query.proposal_id],
    );
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
    res.send(null);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});