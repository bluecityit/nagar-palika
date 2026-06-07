const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  try {
    console.log('Connecting to MySQL...');
    // Connect without specifying the database first, so we can create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'palika_secure_pass',
      multipleStatements: true // Crucial for running an entire SQL file at once
    });

    console.log('Connected successfully! Reading init.sql...');
    
    const sqlFilePath = path.join(__dirname, '..', 'database', 'init.sql');
    const sqlFile = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing init.sql...');
    await connection.query(sqlFile);

    console.log('✅ Database setup completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Failed to setup database:', error.message);
  }
}

setupDatabase();
