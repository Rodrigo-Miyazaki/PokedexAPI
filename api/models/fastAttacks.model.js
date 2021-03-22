const mongoose = require("mongoose");


const fastAttacksSchema = new mongoose.Schema({
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

module.exports = mongoose.model("FastAttack", fastAttacksSchema);