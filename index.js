  const express = require('express');
  const sql = require('mssql');
  const app = express();
  
  // Configure the SQL Server connection as mentioned in the previous response
  const config = {
    server: '202.28.34.203',
    database: 'PRYMANIA_DB',
    user: 'DB_demo5',
    password: 'DB_demo5',
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  // Define a route for the /user endpoint
  app.get('/user', async (req, res) => {
    try {
      // Establish a connection to the SQL Server database
      const pool = await sql.connect(config);

      // Execute a query to retrieve user data
      const result = await pool.request().query('SELECT * FROM USER_F'); // Replace 'Users' with your actual table name
  
      // Send the user data as a JSON response
      res.json(result.recordset);
    } catch (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the database connection
      sql.close();
    }
  });
  
  // Start the Express server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  