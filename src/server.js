
const app = require('../src/app');
const config = require("../config/config");
const mongoose = require("mongoose");
const PokemonController = require("../api/controllers/pokemon.controller")
var server;
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://admin:xzeEGlTqaiun2gCi@cluster0.fvahm.mongodb.net/pokedex?retryWrites=true&w=majority";

	mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true });
	server = app.listen(port, function (err) {
        console.log(`App listening on port ${config.port}`)
		PokemonController.findAllAndCreateExternalAPI();
		if (err){
			throw err;
		}
	});


module.exports = server;