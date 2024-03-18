const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");
const asyncHandler = require("express-async-handler");

const resp = {
  status: true,
  content: {}
};


const getProducts = asyncHandler(async(req,res)=>{
  const products = await db.products.findAll();
  resp.status = true;
  resp.content.data = products;
  res.status(200).json(resp);
  return;
})

const getByProductType = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const checkProductType = await db.productType.findOne({where:{id:id}});
  if(!checkProductType){
    resp.status = false
    resp.content.data = {message: `ProductType with id ${id} doest not exists.`};
    res.status(400).json(resp);
    return;
  }
  const products = await db.products.findAll({where:{product_type:id}});
  resp.status = true;
  resp.content.data = products;
  res.status(200).json(resp);
  return;
})

const getProductVariants = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const checkProduct = await db.products.findOne({where:{id:id}});
  if(!checkProduct){
    resp.status = false
    resp.content.data = {message: `Product with id ${id} doest not exists.`};
    res.status(400).json(resp);
    return;
  }
  const variants = await db.variants.findAll({where:{product:id}});
  resp.status = true;
  resp.content.data = {
    Product: checkProduct.dataValues.name,
    Variants: variants
  };
  res.status(200).json(resp);return;
})

const addToCart = asyncHandler(async(req,res)=>{
  const user = req.user;
  const {count} = req.body;
  const {id} = req.params;
  const checkUser = await db.users.findOne({where:{id:user.id}});
  const seller = (await db.role.findOne({where:{name:"Seller"}})).dataValues;
  if(!checkUser || checkUser.dataValues.role == seller.id){
    resp.status = false
    resp.content.data = {message: `User with id ${user.id} doest not exists.`};
    res.status(400).json(resp);
    return;
  }
  const checkVariant = await db.variants.findOne({where:{id:id}});
  if(!checkVariant){
    resp.status = false
    resp.content.data = {message: `Variant with id ${id} doest not exists.`};
    res.status(400).json(resp);
    return;
  }
  if(isNaN(count)){
    resp.status = false
    resp.content.data = {message: `Count must be a number.`};
    res.status(400).json(resp);
    return;
  }
  const inCart = (await db.status.findOne({where:{name:"In Cart"}})).dataValues;
  const checkCart = await db.buyers.findOne({where:{buyer:user.id,variant:id,status:inCart.id}});
  if(checkCart){
    resp.status = false
    resp.content.data = {message: `Product already exists in your cart.`};
    res.status(400).json(resp);
    return;
  }
  var item = await db.buyers.create({
    id: Snowflake.generate(),
    buyer: user.id,
    variant: id,
    status: inCart.id,
    count: count
  })
  
  resp.status = true;
  resp.content.data = item;
  res.status(200).json(resp);
  return;
});

const placeOrder = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const user = req.user;
  const inCart = (await db.status.findOne({where:{name:"In Cart"}})).dataValues;
  const checkIdBuyer = await db.buyers.findOne({where:{id:id,status:inCart.id}});
  if(!checkIdBuyer){
    resp.status = false
    resp.content.data = {message: `Item with id ${id} doest not exists in your cart.`};
    res.status(400).json(resp);
    return;
  };
  if(checkIdBuyer.dataValues.buyer != user.id){
    resp.status = false
    resp.content.data = {message: `One can only access his/her cart.`};
    res.status(400).json(resp);
    return;
  }
  const successful = (await db.status.findOne({where:{name:"Successful"}})).dataValues;
  const updated = await db.buyers.update({status: successful.id},{where:{id:id}});
  resp.status = true;
  resp.content.data = updated;
  res.status(200).json(resp);return;
});

const getInCart = asyncHandler(async(req,res)=>{
  const user = req.user;
  const checkUser = await db.users.findOne({where:{id:user.id}});
  const seller = (await db.role.findOne({where:{name:"Seller"}})).dataValues;
  if(!checkUser || checkUser.dataValues.role == seller.id){
    resp.status = false
    resp.content.data = {message: `User with id ${user.id} doest not exists.`};
    res.status(400).json(resp);
    return;
  };
  const inCart = (await db.status.findOne({where:{name:"In Cart"}})).dataValues;
  const inCartItems = await db.buyers.findAll({where:{buyer:user.id,status:inCart.id}});
  resp.status = true;
  resp.content.data = inCartItems;
  res.status(200).json(resp);return;
})

const removeFromCart = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const user = req.user;
  const checkUser = await db.users.findOne({where:{id:user.id}});
  if(!checkUser){
    resp.status = false
    resp.content.data = {message: `User with id ${user.id} doest not exists.`};
    res.status(400).json(resp);
    return;
  };
  const cartItemWithId = await db.buyers.findOne({where:{id:id,buyer:user.id}});
  if(!cartItemWithId){
    resp.status = false
    resp.content.data = {message: `User can only remove items from his/her own cart.`};
    res.status(400).json(resp);
    return;
  };
  await db.buyers.destroy({where:{id:id}});
  resp.status= true;
  resp.content.data = {message: "Successfully Deleted."};
  res.status(200).json(resp);
  return;
})

module.exports = {
  getProducts,
  getByProductType,
  getProductVariants,
  addToCart,
  placeOrder,
  getInCart,
  removeFromCart
}