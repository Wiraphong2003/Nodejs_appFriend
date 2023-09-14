const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const db = require('./db');
const queries = require('./queries');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/user', async (req, res) => {
  try {
    const pool = await db.connectDB();
    const result = await pool.request().query(queries.getUserQuery());
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    sql.close();
  }
});

app.get('/user/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const pool = await db.connectDB();
      const query =  queries.getuserfromname(username);
      const result = await pool.request().query(query);
  
      if (result.recordset.length === 1) {
        res.json(result.recordset[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      sql.close();
    }
  });

app.get('/group/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const pool = await db.connectDB();
      const query =  queries.getGroupusername(username);
      const result = await pool.request().query(query);
      
      if (result.recordset.length === 1) {
        res.json(result.recordset);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      sql.close();
    }
  });

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const pool = await db.connectDB();
    const query = queries.loginQuery(username, password);
    const result = await pool.request().query(query);
    if (result.recordset.length === 1) {
      return res.json(result.recordset[0]);
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
