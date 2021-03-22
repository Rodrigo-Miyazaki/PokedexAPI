const router = require("express").Router();
const TFAController = require("../api/controllers/tfa.controller");

router.post("/tfa/setup", TFAController.setupTFA);
router.get("/tfa/setup/:uname", TFAController.findTFA);
router.delete("/tfa/setup", TFAController.deleteTFA);
router.post("/tfa/verify", TFAController.verifyTFA);

module.exports = router;