const { Router } = require("express");
const router = Router();
const { authenticate } = require("../../../middlewares/authenticate.js");
const { add,files } = require("./controller.js");

router.get("/files", [authenticate(),files]);
router.post('/add',[authenticate(),add]);

module.exports = router;
