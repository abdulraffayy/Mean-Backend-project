const Account = require('../models/account.model');

// Create Account
const createAccount = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).send(account);
    } catch (error) {
        res.status(400).send({ message: 'Failed to create account', error });
    }
};

// Get All Accounts
const getAllAccounts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const totalRecords = await Account.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        const accounts = await Account.find().skip(skip).limit(limit);

        res.status(200).send({
            accounts,
            totalPages,
            totalRecords,
            currentPage: page
        });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch accounts', error });
    }
};

// Get Account by ID
const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) return res.status(404).send({ message: 'Account not found' });
        res.status(200).send(account);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch account', error });
    }
};

// Update Account
const updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) return res.status(404).send({ message: 'Account not found' });
        res.status(200).send(account);
    } catch (error) {
        res.status(400).send({ message: 'Failed to update account', error });
    }
};

// Delete Account
const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) return res.status(404).send({ message: 'Account not found' });
        res.status(200).send({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete account', error });
    }
};

module.exports = { createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount };
