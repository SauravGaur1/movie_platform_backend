const { Router } = require("express");
const router = Router();

const { authenticate } = require("../../../middlewares/authenticate.js");
const {validate}=require("../../../middlewares/joivalidators.js");

const { addMovie,downloadFiles,addFiles } = require("./controller.js");
const {movieAddSchema}=require("./validations.js");

router.get("/files", [authenticate(1),downloadFiles]);
router.post('/addMovie',[authenticate(1),validate(movieAddSchema),addMovie]);
router.post('/addFiles',[authenticate(1),addFiles]);

module.exports = router;
