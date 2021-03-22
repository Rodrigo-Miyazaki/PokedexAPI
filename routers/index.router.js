var router = require("express").Router();
var pokemonRouter =  require("./pokemon.router");
var loginRouter =  require("./login.router");
var registerRouter =  require("./register.router");
var tfaRouter =  require("./tfa.router");
var pokemonTypesRouter =  require("./pokemonType.router");
var pokemonFastAttacksRouter = require("./pokemonFastAttacks.router");
var pokemonSpecialAttacksRouter = require("./pokemonSpecialAttacks.router");

router.get('/', (req, res) =>
    res.send('API Works'),
);
router.use("/api", pokemonRouter);
router.use("/api", loginRouter);
router.use("/api", registerRouter);
router.use("/api", tfaRouter);
router.use("/api", pokemonTypesRouter);
router.use("/api", pokemonFastAttacksRouter);
router.use("/api", pokemonSpecialAttacksRouter);

module.exports = router;