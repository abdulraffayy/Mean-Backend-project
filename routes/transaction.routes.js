const express = require('express');
const {
    createTransaction,
    getAllTransactions,
    getTransactionsByAccountId,
    updateTransaction,
    deleteTransaction,
    searchTransactions
} = require('../controllers/transaction.controller');

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/account/:accountId', getTransactionsByAccountId);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);
router.get('/search', searchTransactions);

module.exports = router;
