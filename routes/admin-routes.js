const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin");
const upl = require("../middleware/upload");
const auth = require("../middleware/is-auth");

router.post("/post-ex", upl.cpUpload, adminControllers.adminPost);

router.post("/add-cart/:id", auth, adminControllers.adminCart);

router.get("/get-word", adminControllers.getWord);

router.get("/get-cart", auth, adminControllers.getCart);

module.exports = router;
