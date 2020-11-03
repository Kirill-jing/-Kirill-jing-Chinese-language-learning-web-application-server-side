const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");
const upl = require("../middleware/upload");
const auth = require("../middleware/is-auth");

router.post("/post-ex", upl.cpUpload, adminControllers.adminPost);

router.post("/add-cart/:id", auth, adminControllers.adminCart);

router.get("/get-word", adminControllers.getWord);

router.get("/get-cart", auth, adminControllers.getCart);

router.post("/multiple-words", auth, adminControllers.postMultiple);

router.post("/delete-word/:id", auth, adminControllers.deleteWord);

router.post("/delete-multwords", auth, adminControllers.deleteMultWords);

router.post("/slider-data", auth, adminControllers.sliderData);

module.exports = router;
