
const app = require('../src/app');
const config = require("../config/config");
const mongoose = require("mongoose");
const PokemonController = require("../api/controllers/pokemon.controller")
var server;

	mongoose.connect( config.db, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
		console.log(`DB ${config.db} is connectted`)
	});
	server = app.listen(config.port, function (err) {
        console.log(`App listening on port ${config.port}`)
		PokemonController.findAllAndCreateExternalAPI();
		if (err){
			throw err;
		}
	});


module.exports = server;