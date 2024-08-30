const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../../middlewares/authenticate.js");
const {validate}=require("../../../middlewares/joivalidators.js");

const { add,files } = require("./controller.js");
const {movieAddSchema}=require("./validations.js");

router.get("/files", [authenticate(),files]);
router.post('/add',[authenticate(),validate(movieAddSchema),add]);

module.exports = router;
