require('dotenv').config();

const { Pool } = require('pg');
const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : { database: 'tgif' };

console.log("DATABASE_URL: ")
console.log(process.env.DATABASE_URL)

const pool = new Pool(poolConfig);



module.exports = pool;


