const mongoose = require("mongoose");


const specialAttacksSchema = new mongoose.Schema({
    Name:{
        type: String
    },
    Type:{
        type: String
    },
    Damage:{
        type: Number
    }
})

module.exports = mongoose.model("SpecialAttack", specialAttacksSchema);