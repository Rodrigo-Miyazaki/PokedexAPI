
const app = require('../src/app');
const config = require("../config/config");
const mongoose = require("mongoose");
const PokemonController = require("../api/controllers/pokemon.controller")
var server;
if (process.env.NODE_ENV === "test") {
	mongoose.connect(config.test_db);
	server = app.listen(config.test_port, function (err) {
		if (err){
			throw err;
		}
	});
} else {
	mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
	server = app.listen(config.port, function (err) {
        console.log(`App listening on port ${config.port}`)
		PokemonController.findAllAndCreateExternalAPI();
		if (err){
			throw err;
		}
	});
}

module.exports = server;