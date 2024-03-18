const express = require("express");
const { getProducts, getByProductType, getProductVariants, addToCart, placeOrder, getInCart, removeFromCart } = require("../Controller/buyerController");
const {authenticateToken} = require("../middleware/auth");

const router = express.Router();

router.get('/',getProducts);
router.get('/cart',authenticateToken,getInCart);
router.get('/:id',getByProductType);
router.get('/:id/variants',getProductVariants);
router.post('/:id',authenticateToken,addToCart);
router.put('/:id',authenticateToken,placeOrder);
router.delete('/:id',authenticateToken,removeFromCart);

module.exports = router;