const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();  // Load environment variables from .env file

// Get DB URL from environment variable (without ssl-mode)
const dbUrl = process.env.DB_URL;
const sslCertPath = process.env.SSL_CA_PATH;

// Read the SSL certificate
const sslCert = fs.readFileSync(sslCertPath);

// Parse the URL to extract host, user, password, and database
const url = new URL(dbUrl);

// Create the connection pool with explicit SSL configuration
const pool = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: "secureconnect",  // Remove the leading "/" from the database name
  port: url.port,
  ssl: {
    ca: sslCert,  // SSL certificate for secure connection
    rejectUnauthorized: true,  // Ensure the server's certificate is valid
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
