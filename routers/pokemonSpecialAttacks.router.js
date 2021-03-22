const router = require("express").Router();
const PokemonSpecialAttacksController = require("../api/controllers/pokemonSpecialAttacks.controller");

router.get("/specialAttacks", PokemonSpecialAttacksController.findAll);
router.post("/specialAttacks", PokemonSpecialAttacksController.save);

module.exports = router;