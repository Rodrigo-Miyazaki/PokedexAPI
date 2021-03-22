const PokemonTypes = require("../models/types.model");


 save = function (req, res, next) {
   
    const body = req.body;
    if (!body) {
        res.statusMessage = "Body is undefined";

        
        return res.status(400).end();
    }
    PokemonTypes.create(body, function (err, types) {
        if (err){
            return next(err);
        }

        return res.json(types);
    });
};


 findAll = function (req, res, next) {
    PokemonTypes.find(function (err, types) {
        if (err) {
            return next(err);
        }

        return res.json(types);
    });
    PokemonTypes.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
      });
};



module.exports = { findAll, save };