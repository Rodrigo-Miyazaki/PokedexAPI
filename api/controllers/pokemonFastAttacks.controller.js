
const PokemonFastAttacksModel = require("../models/fastAttacks.model");

findAll = (req, res, next)=>{
    PokemonFastAttacksModel.find(function (err, fastAttacks) {
        if (err) {
            console.log(err)
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
    PokemonFastAttacksModel.create(body, function (err, fastAttacks) {
        if (err){
            return next(err);
        }

        return res.json(fastAttacks);
    });
};

saveFastAttacksExternalAPI = ()=>{
    let aggregate = [
        {
            $unwind: "$fastAttack"
         },
        {
            $group:{
                _id: "$fastAttack.Name",
                type: {$last : "$fastAttack.Type"},
                damage: {$last : "$fastAttack.Damage"},
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
            { $out : "fastattacks" }
    ]
    Pokemon.aggregate(aggregate).then(()=>{
        console.log("Criado collection de FastAttack");
    }).catch((error)=>{

    })
}

module.exports = {findAll, save}