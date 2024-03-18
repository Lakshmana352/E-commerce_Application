const express = require("express");
const { addVariant, deleteVariant, updateVariant } = require("../Controller/sellerVariantController");
const {authenticateToken} = require("../middleware/auth");

const router = express.Router();

router.post('/:id',authenticateToken,addVariant);
router.put('/:id/:vid',authenticateToken,updateVariant);
router.delete('/:id/:vid',authenticateToken,deleteVariant);

module.exports = router;
