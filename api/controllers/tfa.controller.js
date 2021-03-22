

const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const commons = require('../../utils/common');
const router = express.Router();
const User = require('../models/user.model');

setupTFA = (req, res) => {
    console.log(`DEBUG: Received TFA setup request`);
    const secret = speakeasy.generateSecret({
        length: 10,
        name: commons.userObject.uname,
        issuer: 'PokedexAuth v0.0'
    });
    var url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: commons.userObject.uname,
        issuer: 'PokedexAuth v0.0',
        encoding: 'base32'
    });
    QRCode.toDataURL(url, (err, dataURL) => {
        commons.userObject.tfa = {
            secret: '',
            tempSecret: secret.base32,
            dataURL,
            tfaURL: url
        };
        return res.json({
            message: 'TFA Auth needs to be verified',
            tempSecret: secret.base32,
            dataURL,
            tfaURL: secret.otpauth_url
        });
    });
}

verifyTFA = async(req, res) => {
    console.log(`DEBUG: Received TFA Verify request`);
    try{
        let user = await User.findOne({uname: req.body.uname});
        if(user){
            let isVerified = speakeasy.totp.verify({
                secret: commons.userObject.tfa.tempSecret,
                encoding: 'base32',
                token: req.body.token
            });
        
            if (isVerified) {
                console.log(`DEBUG: TFA is verified to be enabled`);
        
                commons.userObject.tfa.secret = commons.userObject.tfa.tempSecret;
                user.tfa = commons.userObject.tfa;
               let update = await User.findByIdAndUpdate(user._id, user);
                return res.send({
                    "status": 200,
                    "message": "Two-factor Auth is enabled successfully"
                });
            }
    
    
            console.log(`ERROR: TFA is verified to be wrong`);
        
            return res.send({
                "status": 403,
                "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
            });
        }
    }catch(error){
        return res.send({
            "status": 403,
            "message": "User not found"
        });
    }


    
}

findTFA = async(req, res, next)=>{
    console.log(`DEBUG: Received FETCH TFA request`);
    try{
        let user = await User.findOne({uname: req.params.uname});
        res.json(user.tfa ? user.tfa : null);
    }catch(error){
        next(error);
    }

}

deleteTFA = (req, res) => {
    console.log(`DEBUG: Received DELETE TFA request`);

    delete commons.userObject.tfa;
    res.send({
        "status": 200,
        "message": "success"
    });
}

module.exports = {setupTFA, verifyTFA, findTFA, deleteTFA };