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

//Example endpoint that sends a try-catch wrapped query to the database
app.get('/test_db2', async (req, res) => {
  let name = "Warren";
  try {
    const query = await db.query(
      "SELECT * FROM users WHERE username=$1;", [name]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//Example endpoint that sends a try-catch wrapped query to the database
app.post('/test_db3', async (req, res) => {
  try {
    const query = await db.query(
      "INSERT INTO users (id, is_admin, username) VALUES ($1, $2, $3);", ['5', true, 'SuperAdmin']
    );
    res.send("Success");
  } catch (error) {
    console.log(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
