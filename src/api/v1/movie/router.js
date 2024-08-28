const { Router } = require("express");
const router = Router();
const { authenticate } = require("../../../middlewares/authenticate");

const { add,files } = require("./controller.js");
router.get("/files", [files]);
router.post("/add",[add]);

module.exports = router;
