const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

// Create Transaction
const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();

        const account = await Account.findById(transaction.accountId);

        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }

        if (transaction.amount > 0) {
            account.accountBalance += transaction.transactionAmount;
        } else {
            account.accountBalance += transaction.transactionAmount; // Subtracting since amount is negative
        }

        await account.save();

        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send({ message: 'Failed to create transaction', error });
    }
};

// Get All Transactions
const getAllTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const transactions = await Transaction.find()
            .populate('accountId', 'name phoneNumber')
            .skip(skip)
            .limit(limit);

        const totalRecords = await Transaction.countDocuments();

        res.status(200).send({
            transactions,
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit)
        });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch transactions', error });
    }
};

// Get Transactions by Account ID
const getTransactionsByAccountId = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        let transactions = await Transaction.find({ oID: req.params.accountId })
            .skip(skip)
            .limit(limit);

        let totalRecords = await Transaction.countDocuments({ oID: req.params.accountId });

        if (totalRecords === 0) {
            transactions = await Transaction.find({ accountId: req.params.accountId })
                .skip(skip)
                .limit(limit);

            totalRecords = await Transaction.countDocuments({ accountId: req.params.accountId });
        }

        res.status(200).send({
            transactions,
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit)
        });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch transactions', error });
    }
};

// Update Transaction
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).send({ message: 'Transaction not found' });

        const account = await Account.findById(transaction.accountId);
        if (!account) return res.status(404).send({ message: 'Account not found' });

        // Revert the old transaction amount
        account.accountBalance -= transaction.transactionAmount;

        // Update the transaction
        Object.assign(transaction, req.body);
        await transaction.save();

        // Apply the new transaction amount
        account.accountBalance += transaction.transactionAmount;
        await account.save();

        res.status(200).send(transaction);
    } catch (error) {
        res.status(400).send({ message: 'Failed to update transaction', error });
    }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(404).send({ message: 'Transaction not found' });
        res.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete transaction', error });
    }
};

// Search Transactions
const searchTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.q;

        const query = {
            $or: [
                { description: { $regex: searchQuery, $options: 'i' } },
                { transactionType: { $regex: searchQuery, $options: 'i' } },
                { transactionAmount: { $regex: searchQuery, $options: 'i' } },
                { accountId: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const transactions = await Transaction.find(query)
            .populate('accountId', 'name phoneNumber')
            .skip(skip)
            .limit(limit);

        const totalRecords = await Transaction.countDocuments(query);

        res.status(200).send({
            transactions,
            totalRecords,
            currentPage: page,
            totalPages: Math.ceil(totalRecords / limit)
        });
    } catch (error) {
        res.status(500).send({ message: 'Failed to search transactions', error });
    }
};

module.exports = { createTransaction, getAllTransactions, getTransactionsByAccountId, updateTransaction, deleteTransaction, searchTransactions };


