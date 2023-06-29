const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'postgres',
  port: 5432,
});

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());



















app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM just_table ORDER BY time LIMIT 1000');
    res.json(result.rows);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3004, () => console.log('Server listening on port 3004'));




