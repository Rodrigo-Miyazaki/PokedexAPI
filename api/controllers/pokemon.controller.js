const Pokemon = require("../models/pokemon.model");
const request = require('request');
const PokemonService = require("../services/pokemon.service");


save = function (req, res, next) {

    const body = req.body;
    if (!body) {
        res.statusMessage = "Body is undefined";


        return res.status(400).end();
    }
    Pokemon.create(body, function (err, pokemon) {
        if (err) {
            return next(err);
        }

        return res.json(pokemon);
    });
};


update = function (req, resp, next) {

    const body = req.body;
    if (!body) {
        res.statusMessage = "Body is undefined";


        return res.status(400).end();
    }
    let id = req.body._id;
    Pokemon.findByIdAndUpdate(id, body).then((res)=>{
        return resp.json(res)
    }).catch(error=>{
        next(error);
    });
};


findAll =  async(req, res, next)=>{
    let skip = req.query.skip | 0;
    let first = req.query.first | 0;
    let limit = req.query.limit | 10;
    let projection = {name: 1, types: 1, fastAttack: 1, specialAttack: 1, generation:1 };
    let pokemons;
    let count;
    try{
        count = await Pokemon.count({});
        pokemons = await Pokemon.find({}, projection).limit(limit).skip(skip).exec();
        let updatedPokemons = [];
        for (let pokemon of pokemons) {
            let newPokemon = {};
            newPokemon.qtdAttack = PokemonService.getAttacksQuantity(pokemon);
            newPokemon.types = PokemonService.getFormattedTypes(pokemon);
            newPokemon._id = pokemon._id;
            newPokemon.name = pokemon.name;
            newPokemon.generation = pokemon.generation;
            updatedPokemons.push(newPokemon)
        }
        return res.json({totalRecords: count, items: updatedPokemons});
    }catch(error){
        return next(error)
    }
   
};

findByName =  async(req, res, next)=>{
    let name = req.params.name;
    let skip = req.query.skip | 0;
    let first = req.query.first | 0;
    let limit = req.query.limit | 10;
    let projection = {name: 1, types: 1, fastAttack: 1, specialAttack: 1, generation:1 };
    let pokemons;
    let count;
    try{
        count = await Pokemon.count({ name: { $regex: `${name}`, $options: 'i' }});
        pokemons  = await Pokemon.find({ name: { $regex: `${name}`, $options: 'i' }}, projection).limit(limit).skip(skip).exec();
        let updatedPokemons = [];
        for (let pokemon of pokemons) {
            let newPokemon = {};
            newPokemon.qtdAttack = PokemonService.getAttacksQuantity(pokemon);
            newPokemon.types = PokemonService.getFormattedTypes(pokemon);
            newPokemon._id = pokemon._id;
            newPokemon.name = pokemon.name;
            newPokemon.generation = pokemon.generation;
            updatedPokemons.push(newPokemon)
        }
        return res.json({totalRecords: count, items: updatedPokemons});
    }catch(error){
        return next(error)
    }
};

findById =  (req, resp, next)=>{
    let _id = req.params.id;
    Pokemon.findById(_id).then((res)=>{
        return resp.json(res);
    }).catch((error)=>{
        return next(error);
    })
}

deleteById = (req,resp, next)=>{
    let _id = req.params.id;
    Pokemon.findByIdAndDelete(_id).then((res)=>{
        return resp.json(res);
    }).catch((error)=>{
        return next(error);
    })
}

findAllAndCreateExternalAPI = function() {

    let promise = new Promise((resolve, reject) => {
        request('https://raw.githubusercontent.com/Brunnerlivio/PokemonDataGraber/master/output.json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let pokemons = JSON.parse(body);
                if (pokemons && pokemons.length > 0) {
                    pokemons.forEach((pokemon) => {
                        if (pokemon) {
                            let filter = { number: pokemon.Number }
                            let newPokemon = {
                                number: pokemon['Number'],
                                name: pokemon['Name'],
                                generation: pokemon['Generation'],
                                about: pokemon['About'],
                                types: pokemon['Types'],
                                resistant: pokemon['Resistant'],
                                weaknesses: pokemon['Weaknesses'],
                                fastAttack: pokemon['Fast Attack(s)'],
                                specialAttack: pokemon['Special Attack(s)'],
                                weight: pokemon['Weight'],
                                height: pokemon['Height'],
                                buddyDistance: pokemon['Buddy Distance'],
                                baseStamina: pokemon['Base Stamina'],
                                baseAttack: pokemon['Base Attack'],
                                baseDefense: pokemon['Base Defense'],
                                baseFleeRate: pokemon['Base Flee Rate'],
                                nextEvolutionRequirements: pokemon['Next Evolution Requirements'],
                                nextEvolution: pokemon['Next evolution(s)'],
                                pokèmonClass: pokemon['Pokèmon Class'],
                                maxCP: pokemon['MaxCP'],
                                maxHP: pokemon['MaxHP'],
                                mythic: pokemon['MYTHIC'],
                                lengendary: pokemon['LEGENDARY']

                            }
                            Pokemon.findOneAndUpdate(filter, newPokemon, {
                                new: true,
                                upsert: true // Make this update into an upsert
                            }, function (err, doc, res) {
                                if (err) {
                                    reject(err);
                                }

                            });
                        }
                    })
                    resolve(true);
                }

            }
        });
    })

    promise.then((res) => {
        console.log("findAllAndCreateExternalAPI")
    }).catch((error) => {
        console.log(error)
    })

}

module.exports = { findAll, save, findByName, findAllAndCreateExternalAPI, findById, update, deleteById};