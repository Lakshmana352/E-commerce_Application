const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {
  }
};

const addProduct = asyncHandler(async(req,res)=>{
  const {productType,name} = req.body;
  const user = req.user;
  if(!productType || !name){
    resp.status = false;
    resp.content.data = {message: "All fields are required."};
    res.status(400).json(resp);return;
  }
  const roleCheck = await db.role.findOne({where:{id:user.role,name: "Seller"}});
  if(!roleCheck){
    resp.status = false;
    resp.content.data = {message: `Only sellers can add product to sell.`};
    res.status(400).json(resp);return;
  }
  const productTypeCheck = await db.productType.findOne({where:{id:productType}});
  if(!productTypeCheck){
    resp.status = false;
    resp.content.data = {message: `ProductType with id ${productType} doest not exists.`};
    res.status(400).json(resp);return;
  }
  const productCheck = await db.products.findOne({where:{seller:user.id,product_type:productType,name:name}});
  if(productCheck){
    resp.status = false;
    resp.content.data = {message: `Product with name ${name} already exists under your selling.`};
    res.status(400).json(resp);return;
  }
  const product = await db.products.create({
    id: Snowflake.generate(),
    seller: user.id,
    product_type: productType,
    name: name
  });
  resp.status = true;
  resp.content.data = product;
  res.status(201).json(resp);
});


const updateProduct = asyncHandler(async(req,res)=>{
  var {productType,name} = req.body;
  const {id} = req.params;
  const user = req.user;
  const product = await db.products.findOne({where:{id:id}});
  if(!product){
    resp.status = false;
    resp.content.data = {messsage: `Product doest not exists with id ${id}.`};
    res.status(400).json(resp);return;
  }
  if(user.id != product.dataValues.seller){
    resp.status = false;
    resp.content.data = {messsage: `Only Seller of the given product can update.`};
    res.status(400).json(resp);return;
  }
  if(!productType && !name){
    resp.status = false;
    resp.content.data = {messsage: `Atleast one field must be filled.`};
    res.status(400).json(resp);return;
  };
  if(!productType){
    productType = product.dataValues.product_type;
  }
  if(!name){
    name = product.dataValues.name;
  }
  const updated = await db.products.update({product_type:productType,name:name},{where:{id:id}});
  resp.status = true;
  resp.content.data = updated;
  res.status(200).json(resp);return;
})

const deleteProduct = asyncHandler(async(req,res)=>{
  const user = req.user;
  const {id} = req.params;
  const product = await db.products.findOne({where:{id:id}});
  if(!product){
    resp.status = false;
    resp.content.data = {messsage: `Product doest not exists with id ${id}.`};
    res.status(400).json(resp);return;
  }
  if(user.id != product.dataValues.seller){
    resp.status = false;
    resp.content.data = {messsage: `Only Seller of the given product can update.`};
    res.status(400).json(resp);return;
  }
  await db.products.destroy({where:{id:id}});
  await db.variants.destroy({where:{product:id}});
  resp.status = true;
  resp.content.data = {message: "Deleted successfully."};
  res.status(200).json(resp);
  return;
})

const getProducts = asyncHandler(async(req,res)=>{
  const user = req.user;
  const products = await db.products.findAll({where:{seller:user.id}});
  const d = [];
  for(const product of products){
    const variant = await db.variants.findAll({where:{product:product.dataValues.id}});
    d.push({
      productId: product.dataValues.id,
      productType: product.dataValues.product_type,
      product: product.dataValues.name,
      variants: variant
    })
  };
  resp.status = true;
  resp.content.data = d;
  res.status(200).json(resp);
  return;
})

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts
}