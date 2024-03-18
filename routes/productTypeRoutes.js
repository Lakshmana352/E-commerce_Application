const express = require("express");
const { createProductType, getProductType } = require("../Controller/productTypeContoller");

const router = express.Router();

router.post('/',createProductType);
router.get('/',getProductType);

module.exports = router;