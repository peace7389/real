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
    const endDate = new Date();
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);

    let result = await pool.query(
      'SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY time DESC) AS row_num FROM just_table WHERE time BETWEEN $1 AND $2) AS subquery WHERE (row_num - 1) % 30 = 0 LIMIT 1000',
      [startDate, endDate]
    );
    
    return res.json(result.rows); // Use the return statement here to send the response and exit the function
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message }); // Use the return statement here to send the error response and exit the function
  }
});



app.listen(3005, () => console.log('Server listening on port 3005'));