const router = require("express").Router();
const PokemonController = require("../api/controllers/pokemon.controller");

router.get("/pokemons", PokemonController.findAll);
router.get("/pokemons/search/:name", PokemonController.findByName);
router.get("/pokemons/:id", PokemonController.findById);
router.delete("/pokemons/:id", PokemonController.deleteById);
router.post("/pokemons", PokemonController.save);
router.patch("/pokemons", PokemonController.update);

module.exports = router;