
const PokemonSpecialAttacksModel = require("../models/specialAttacks.model");

findAll = (req, res, next)=>{
    PokemonSpecialAttacksModel.find(function (err, fastAttacks) {
        if (err) {
            return next(err);
        }
        return res.json(fastAttacks);
    });
   
}

save = function (req, res, next) {
   
    const body = req.body;
    if (!body) {
        res.statusMessage = "Body is undefined";

        
        return res.status(400).end();
    }
    PokemonSpecialAttacksModel.create(body, function (err, fastAttacks) {
        if (err){
            return next(err);
        }

        return res.json(fastAttacks);
    });
};

saveFastAttacksExternalAPI = ()=>{
    let aggregate = [
        {
            $unwind: "$specialAttack"
         },
        {
            $group:{
                _id: "$specialAttack.Name",
                type: {$last : "$specialAttack.Type"},
                damage: {$last : "$specialAttack.Damage"},
            }
        },
        {
            $project: {
                _id:0,
                Name: "$_id",
                Type: "$type",
                Damage: "$damage",
                }
            },
            { $out : "specialattacks" }
    ]
    Pokemon.aggregate(aggregate).then(()=>{
        console.log("Criado collection de FastAttack");
    }).catch((error)=>{

    })
}

module.exports = {findAll, save}