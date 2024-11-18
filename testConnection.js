// testConnection.js
const db = require('./db');

async function testConnection() {
  try {
    const [rows, fields] = await db.execute('SELECT 1'); // A simple query to test the connection
    console.log('Connection successful!', rows); // Logs the result if connection is successful
  } catch (err) {
    console.error('Connection failed:', err.message); // Logs the error if connection fails
  }
}

testConnection();
