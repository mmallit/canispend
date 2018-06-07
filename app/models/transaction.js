var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TransactionSchema   = new Schema({
    date: Date,
    amount: Number,
    user: String,
    category: String,
    newbalance: Number
});

module.exports = mongoose.model('Transaction', TransactionSchema);