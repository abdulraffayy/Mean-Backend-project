const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    oID: { type: Number,required: true},
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    CNIC: { type: Number, required: true },
    address: { type: String, required: true },
    accountNumber: { type: String, default: null },
    accountBalance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Account', AccountSchema);
