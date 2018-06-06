var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TransactionSchema   = new Schema({
    date: Date,
    amount: Number,
    user: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);