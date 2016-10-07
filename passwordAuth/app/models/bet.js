var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BetSchema = new Schema({
	team: {
		type: String,
		required: true
	},
	line: {
		type: String,
		required: true
	},
	wagerAmount: {
		type: Number,
		required: true
	},
	winAmount: {
		type: Number,
		required: true
	}

})

var Bet = mongoose.model('Bet', BetSchema);

module.exports = Bet;