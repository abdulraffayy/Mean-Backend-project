const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    oID: { type: Number, default: null, required: true },
    accountNumber: { type: String, default: null },
    transactionDate: { type: Date, required: true },
    transactionAmount: { type: Number, required: true },
    transactionDescription: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
