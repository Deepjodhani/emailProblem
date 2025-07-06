const express = require("express");
const router = express.Router();

const {imageUpload, videoUpload, imgReducerUp, localFilep} = require("../Controllers/fileUpload");

router.post("/localFilep", localFilep);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imgReducerUp", imgReducerUp);

module.exports = router;