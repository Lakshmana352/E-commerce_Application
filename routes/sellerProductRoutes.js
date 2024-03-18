const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProducts } = require("../Controller/sellerProductController");
const {authenticateToken} = require("../middleware/auth");

const router = express.Router();

router.post('/',authenticateToken,addProduct);
router.put('/:id',authenticateToken,updateProduct);
router.delete('/:id',authenticateToken,deleteProduct);
router.get('/',authenticateToken,getProducts);

module.exports = router;