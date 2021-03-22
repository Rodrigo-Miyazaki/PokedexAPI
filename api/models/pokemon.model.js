const mongoose = require("mongoose");
const PokemonController = require("../controllers/pokemon.controller");

const pokemonSchema = new mongoose.Schema({
    number:{
        type: String
    },
    name:{
        type: String
    },
    generation:{
        type: String
    },
    about:{
        type: String
    },
    types:{
        type: Array
    },
    resistant:{
        type: Array
    },
    weaknesses:{
        type: Array
    },
    fastAttack:{
        type: Array
    },
    specialAttack:{
        type: Array
    },
    weight:{
        type: Object
    },
    height:{
        type: Object
    },
    buddyDistance:{
        type: String
    },
    baseStamina:{
        type: String
    },
    baseAttack:{
        type: String
    },
    baseDefense:{
        type: String
    },
    baseFleeRate :{
        type: String
    },
    nextEvolutionRequirements:{
        type: Object
    },
    nextEvolution: {
        type: Array
    },
    maxCP: {
        type: Number
    },
    maxHP:{
        type: Number
    },
    pokemonClass:{
        type: String
    },
    mythic:{
        type: String
    },
    legendary:{
        type: String
    }

});


module.exports = mongoose.model("Pokemon", pokemonSchema);