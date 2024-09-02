const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../../middlewares/authenticate.js");
const {validate}=require("../../../middlewares/joivalidators.js");

const { addMovie,downloadFiles,addFiles } = require("./controller.js");
const {movieAddSchema}=require("./validations.js");

router.get("/files", [authenticate(),downloadFiles]);
router.post('/addMovie',[authenticate(),validate(movieAddSchema),addMovie]);
router.post('/addFiles',[authenticate(),addFiles]);

module.exports = router;
