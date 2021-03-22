const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    uname:{
        type: String
    },
    upass:{
        type: String
    },
    tfa:{
        type: Object
    }
})

userSchema.index({ uname: 1});


module.exports = mongoose.model("User", userSchema);