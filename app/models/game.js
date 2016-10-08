var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
	week: {
		type: Number,
		// required: true
	},
	homeTeam: {
		type: String,
		// required: true
	},
	awayTeam: {
		type: String,
		// required: true
	},
	homeLine: {
		type: String
		// required: true
	}
})

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;