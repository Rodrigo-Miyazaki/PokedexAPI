const router = require("express").Router();
const PokemonTypesController = require("../api/controllers/pokemon.controller");

router.get("/types", PokemonTypesController.findAll);
router.post("/types", PokemonTypesController.save);


module.exports = router;