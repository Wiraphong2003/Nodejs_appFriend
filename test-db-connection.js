const sql = require('mssql');

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

async function testConnection() {
  try {
    // Attempt to connect to the SQL Server database
    await sql.connect(config);
    
    // If the connection is successful, log a success message
    console.log('Connected to SQL Server');
    
    // Close the connection
    await sql.close();
  } catch (err) {
    // If an error occurs, log the error message
    console.error('Error connecting to SQL Server:', err);
  }
}

// Call the testConnection function to check the connection
testConnection();
