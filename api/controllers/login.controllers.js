const express = require('express');
const speakeasy = require('speakeasy');
const commons = require('../../utils/common');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

authenticate = async (req, res) => {
    console.log(`DEBUG: Received login request`);
    try {
        let user = await User.findOne({ uname: req.body.uname });
        if (user) {
            if (user.uname && user.upass) {

                if (!user.tfa || !user.tfa.secret) {

                    if (req.body.uname == user.uname && bcrypt.compare(req.body.upass, user.pass)) {
                        console.log(`DEBUG: Login without TFA is successful`);

                        return res.send({
                            "status": 200,
                            "message": "success"
                        });
                    }
                    console.log(`ERROR: Login without TFA is not successful`);

                    return res.send({
                        "status": 403,
                        "message": "Invalid username or password"
                    });

                } else {
                    console.log(user.upass)
                    let isEqual = await bcrypt.compare(req.body.upass, user.upass);
                    if (req.body.uname != user.uname || isEqual === false) {
                        console.log(`ERROR: Login with TFA is not successful`);

                        return res.send({
                            "status": 403,
                            "message": "Invalid username or password"
                        });
                    }
                    if (!req.headers['x-tfa']) {
                        console.log(`WARNING: Login was partial without TFA header`);

                        return res.send({
                            "status": 206,
                            "message": "Please enter the Auth Code"
                        });
                    }
                    let isVerified = speakeasy.totp.verify({
                        secret: user.tfa.secret,
                        encoding: 'base32',
                        token: req.headers['x-tfa']
                    });

                    if (isVerified) {
                        console.log(`DEBUG: Login with TFA is verified to be successful`);
                        let updateUser = user;
                        updateUser.tfa = user.tfa;
                        let update = await User.findByIdAndUpdate(user._id, updateUser);
                        return res.send({
                            "status": 200,
                            "message": "success"
                        });
                    } else {
                        console.log(`ERROR: Invalid AUTH code`);

                        return res.send({
                            "status": 206,
                            "message": "Invalid Auth Code"
                        });
                    }
                }
            }
        } else {
            return res.send({
                "status": 404,
                "message": "Please register to login"
            });
        }
    } catch (error) {
        return res.send({
            "status": 404,
            "message": "Please register to login"
        });
    }




}



module.exports = { authenticate };