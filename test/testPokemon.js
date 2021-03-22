const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
let server = require('../src/server');
let PokemonModel = require('../api/models/pokemon.model');
chai.use(chaiHttp);

let should = chai.should();

describe('Pokemon', () => {

  beforeEach((done) => { //Before each test we empty the database
    PokemonModel.deleteMany({}, (err) => {
      done();
   })
    
  });
  

  describe('/GET Pokemons', () => {
    it('it should GET all the pokemons', (done) => {
      chai.request(server)
          .get('/api/pokemons')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });
  });
  
  describe('/POST Pokemons', () => {
    it('it should POST a pokemon', (done) => {
        let pokemon = {
        number:"001",
        name:"Bulbasaur",
        generation:"Generation I",
        about:"Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
        types:["Grass","Poison"],
        resistant:["Water","Electric","Grass","Fighting","Fairy"],
        weaknesses:["Fire","Ice","Flying","Psychic"],
        fastAttack:[{"Name":"Tackle","Type":"Normal","Damage":12},
                          {"Name":"Vine Whip","Type":"Grass","Damage":7}],
        specialAttack:[{"Name":"Power Whip","Type":"Grass","Damage":70},
                            {"Name":"Seed Bomb","Type":"Grass","Damage":40},
                            {"Name":"Sludge Bomb","Type":"Poison","Damage":55}],
        weight:{"Minimum":"6.04kg","Maximum":"7.76kg"},
        height:{"Minimum":"0.61m","Maximum":"0.79m"},
        buddyDistance:"3km (Medium)",
        baseStamina:"90 stamina points.",
        baseAttack:"118 attack points.",
        baseDefense:"118 defense points.",
        baseFleeRate:"10% chance to flee.",
        nextEvolutionRequirements:{Amount:25,Name:"Bulbasaur candies"},
        nextEvolution:[{Number:2,Name:"Ivysaur"},{Number:3,Name:"Venusaur"}],
        maxCP:951,
        maxHP:1071
        }
      chai.request(server)
          .post('/api/pokemons')
          .send(pokemon)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });
  
  });

  afterEach((done) => { //Before each test we empty the database
    PokemonModel.deleteMany({}, (err) => {
      done();
   })
    
  });
  
});


