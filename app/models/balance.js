var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BalanceSchema   = new Schema({
    date: Date,
    amount: Number 
});

module.exports = mongoose.model('Balance', BalanceSchema);