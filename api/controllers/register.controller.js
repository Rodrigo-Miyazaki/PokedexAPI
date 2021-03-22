
const express = require('express');
const commons = require('../../utils/common');
const router = express.Router();
const User  = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
register = (req, res) => {
    console.log(`DEBUG: Received request to register user`);

    const result = req.body;

    if ((!result.uname && !result.upass) || (result.uname.trim() == "" || result.upass.trim() == "")) {
        return res.send({
            "status": 400,
            "message": "Username/ password is required"
        });
    }

    commons.userObject.uname = result.uname;
    commons.userObject.upass = result.upass;
    delete commons.userObject.tfa;
    let user = {};
    user.uname = result.uname;
    let hash = bcrypt.hashSync(result.upass, salt);
    user.upass = hash;
    User.create(user).then(()=>{
        return res.send({
            "status": 200,
            "message": "User is successfully registered"
        });
    }).catch((error)=>{
        return res.send({
            "status": 400,
            "message": "Username is already registered"
        });
    })

}

module.exports = {register};