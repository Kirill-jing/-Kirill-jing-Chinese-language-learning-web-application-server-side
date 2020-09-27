const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");
const upl = require("../middleware/upload");

router.post("/post-ex", upl.cpUpload, adminControllers.adminPost);

router.get("/get-word", adminControllers.getWord);

module.exports = router;
