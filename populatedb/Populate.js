const mongoose = require('mongoose');
const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

// Static Data
const users = [
    {
        name: "Admin User",
        email: "admin@bank.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Kamran Ahmed",
        email: "kamran@example.com",
        password: "customer123",
        role: "customer"
    },
    {
        name: "Zainab Ali",
        email: "zainab@example.com",
        password: "customer123",
        role: "customer"
    }
];

const accounts = [
    {
        oID: 1001,
        name: "Kamran Ahmed",
        phoneNumber: 923001234567,
        CNIC: 4210112345678,
        address: "House 123, Block 6, Gulshan-e-Iqbal, Karachi",
        accountNumber: "PK01BANK0000001",
        accountBalance: 50000
    },
    {
        oID: 1002,
        name: "Zainab Ali",
        phoneNumber: 923157654321,
        CNIC: 4220187654321,
        address: "Flat 45-B, Block 13, DHA Phase 6, Lahore",
        accountNumber: "PK01BANK0000002",
        accountBalance: 75000
    },
    {
        oID: 1003,
        name: "Usman Khan",
        phoneNumber: 923331234567,
        CNIC: 4220198765432,
        address: "House 789, Street 12, F-7, Islamabad",
        accountNumber: "PK01BANK0000003",
        accountBalance: 100000
    }
];

const transactions = [
    {
        oID: 1001,
        accountNumber: "PK01BANK0000001",
        transactionDate: new Date("2024-03-15"),
        transactionAmount: 25000,
        transactionDescription: "Salary Credit"
    },
    {
        oID: 1001,
        accountNumber: "PK01BANK0000001",
        transactionDate: new Date("2024-03-16"),
        transactionAmount: -5000,
        transactionDescription: "ATM Withdrawal"
    },
    {
        oID: 1002,
        accountNumber: "PK01BANK0000002",
        transactionDate: new Date("2024-03-16"),
        transactionAmount: 50000,
        transactionDescription: "Bank Transfer"
    }
];

// Function to populate database
const populateDatabase = async () => {
    try {
        // Clear existing data
        await Account.deleteMany({});
        await Transaction.deleteMany({});
        await User.deleteMany({});

        // Insert Users
        const createdUsers = await User.create(users);
        console.log('Users created successfully');

        // Insert Accounts
        const createdAccounts = await Account.create(accounts);
        console.log('Accounts created successfully');

        // Insert Transactions with account references
        const transactionsWithRefs = transactions.map(transaction => {
            const relatedAccount = createdAccounts.find(
                account => account.accountNumber === transaction.accountNumber
            );
            return {
                ...transaction,
                accountId: relatedAccount._id
            };
        });

        await Transaction.create(transactionsWithRefs);
        console.log('Transactions created successfully');

        console.log('Database populated successfully!');
        return true;
    } catch (error) {
        console.error('Error populating database:', error);
        return false;
    }
};

module.exports = populateDatabase;