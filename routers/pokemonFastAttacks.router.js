const router = require("express").Router();
const PokemonFastAttacksController = require("../api/controllers/pokemonFastAttacks.controller");

router.get("/fastAttacks", PokemonFastAttacksController.findAll);
router.post("/fastAttacks", PokemonFastAttacksController.save);

module.exports = router;