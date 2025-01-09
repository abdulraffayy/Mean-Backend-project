const sql = require('mssql');
const mongoose = require('mongoose');
const Account = require('../models/account.model'); // MongoDB model
const Transaction = require('../models/transaction.model'); // MongoDB model
const DBConnection = require('../db/db');
// SQL Server Configuration
const sqlConfig = {
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

// MongoDB Configuration
const mongoURI = 'mongodb://localhost:27017/hm-db';

async function migrateAccounts() {
    const sqlPool = await sql.connect(sqlConfig);
    await mongoose.connect(mongoURI);

    try {
        console.log('Fetching accounts from SQL Server...');
        const result = await sqlPool.request().query('SELECT * FROM account');
        const accounts = result.recordset;

        console.log('Inserting accounts into MongoDB...',accounts[0]);
        for (const acc of accounts) {
            const accountData = {
                oID: acc.Id ,
                name: acc.Name,
                phoneNumber: acc.MobileNumber || '00000000',
                CNIC: acc.CNIC,
                address: acc.Address,
                accountNumber: acc.Number || null,
                accountBalance: acc.Balance || 0
            };
            // console.log(accountData.oID);
            await Account.create(accountData);
        }

        console.log('Accounts migrated successfully!');
    } catch (error) {
        console.error('Error migrating accounts:', error);
    } finally {
        await sql.close();
        await mongoose.disconnect();
    }
}

async function migrateTransactions() {
    const sqlPool = await sql.connect(sqlConfig);
    await mongoose.connect(mongoURI);

    try {
        console.log('Fetching transactions from SQL Server...');
        const result = await sqlPool.request().query('SELECT * FROM [Transaction]'); // Replace with your actual SQL query
        const transactions = result.recordset;

        console.log('Inserting transactions into MongoDB...',result.recordset[0]);
        for (const txn of transactions) {
            // Find the MongoDB accountId for the given SQL account_id
            const account = await Account.findOne({ oId: txn.AccountId });
            if (!account) {
                console.warn(`Account not found for transaction ID ${txn.Id}`);
                continue;
            }

            const transactionData = {
                accountId: account._id,
                oID: account.oID,
                accountNumber: txn.Number || null,
                transactionDate: txn.Date,
                transactionAmount: txn.Amount,
                transactionDescription: txn.Description
            };

            await Transaction.create(transactionData);
        }

        console.log('Transactions migrated successfully!');
    } catch (error) {
        console.error('Error migrating transactions:', error);
    } finally {
        await sql.close();
        await mongoose.disconnect();
    }
}

async function runMigration() {
    console.log('Starting migration...');
    // await migrateAccounts();
    await migrateTransactions();
    // console.log('Migration completed!');
}

runMigration();
