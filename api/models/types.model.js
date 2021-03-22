const mongoose = require("mongoose");

const pokemonTypesSchema = new mongoose.Schema({
   name:{
       type: String
   },
   value: {
       type: String
   }
});

module.exports = mongoose.model("Types", pokemonTypesSchema);