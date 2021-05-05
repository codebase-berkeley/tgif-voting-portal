const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('./db-connection');
const { Query } = require('pg');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());

app.use(cors(corsOptions));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
  }),
);
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
      const query = await db.query(
        'SELECT * FROM users',
      );
      for (let i = 0; i < query.rows.length; i += 1) {
        if (query.rows[i].email === profile.emails[0].value) {
          return done(null, query.rows[i]);
        }
      }
      return done(null, false);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
  const query = await db.query(
    'SELECT * FROM users WHERE id=$1;',
    [userID],
  );
  done(null, query.rows[0]);
});

function verifyAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else if (req.path.startsWith('/auth')) {
    next();
  } else {
    res.status(403).send();
  }
}

app.use(verifyAuthenticated);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/fail' }), (req, res) => res.redirect('http://localhost:3000/dashboard'));

app.get('/auth/google/fail',
  (req, res) => res.redirect('http://localhost:3000/login-fail'));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/isauth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/getProfile', async (req, res) => {
  try {
    if(req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.status(403);
      res.send("you shouldn't be here. ew!!!!");
    }
  } catch (error) {
    console.log(error.stack);
  }
})

app.post('/submitProposal', async (req, res) => {
  try {
    const { title } = req.body;
    const { organization } = req.body;
    const { amount_requested } = req.body;
    const { link } = req.body;
    const { description_text } = req.body;
    await db.query(
      'INSERT INTO proposals (title, organization, amount_requested, link, description_text) VALUES ($1, $2, $3, $4, $5);', [title, organization,amount_requested,link,description_text],
    );
    res.send('Success');
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
    console.log("comment posted!!");
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

app.get('/get_one_vote', async (req, res) => {
  try {
    const userID = req.query.user_id;
    const proposalId = req.query.proposal_id;
    const query = await db.query(
      'SELECT * FROM votes WHERE user_id=$1 AND proposal_id=$2;', [userID, proposalId],
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/get_proposals_and_user_votes', async (req, res) => {
  const userID = req.query.user_id;
  try {
    const query = await db.query(
      'SELECT * FROM proposals LEFT JOIN (SELECT * FROM votes WHERE votes.user_id=$1) as votes_subset ON votes_subset.proposal_id = proposals.id', 
      [userID],
    );
    query.rows.forEach(proposal => {
      proposal.user_id = userID;
    });
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

app.get('/getProposals', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM proposals;',
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.delete('/delete_proposal', async (req, res) => {
  try {
    const propsList = req.body.listOfIDs;
    await db.query(
      `DELETE FROM comments WHERE proposal_id IN (${propsList})`,
    );
    await db.query(
      `DELETE FROM votes WHERE proposal_id IN (${propsList})`,
    );
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

app.get('/get_proposal_details', async (req, res) => {
  try {
    const proposalId = req.query.proposal_id;
    const query = await db.query(
      'SELECT * FROM proposals WHERE id=$1;', [proposalId],
    );
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.logout();
    res.send();
  } catch (error) {
    console.log(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
