const sql = require('mssql');

const config = {
    server: 'localhost', // Replace with your server name or IP
    database: 'hm-db', // Replace with your database name
    options: {
        encrypt: false, // Set to true if using Azure or HTTPS
        trustServerCertificate: true, // If using self-signed certificates
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: 'qasim', // Replace with your domain or leave empty for local machine
            userName: 'qasim', // Replace with your Windows username
            password: 'Systems@123#@!' // Optional, can be omitted if your current user has access
        }
    }
};


async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool; // Return the connection pool for queries
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
}

module.exports = { config };

