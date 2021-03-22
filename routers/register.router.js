const router = require("express").Router();
const RegisterController = require("../api/controllers/register.controller");

router.post("/register", RegisterController.register);


module.exports = router;