const router = require("express").Router();
const LoginController = require("../api/controllers/login.controllers");

router.post("/login", LoginController.authenticate);


module.exports = router;