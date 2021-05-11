const { Pool } = require('pg');
const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : { database: 'tgif' };

const pool = new Pool(poolConfig);

require('dotenv').config();

module.exports = pool;


