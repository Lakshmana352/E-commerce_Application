const express = require("express");
const {createVariantType,getVariantType} = require("../Controller/variantTypeController");

const router = express.Router();

router.post('/',createVariantType);
router.get('/',getVariantType);

module.exports = router;