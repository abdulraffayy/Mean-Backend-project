const express = require('express');
const {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
} = require('../controllers/account.controller');

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;
