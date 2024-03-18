const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {
  }
};

const addVariant = asyncHandler(async(req,res)=>{
  const user = req.user;
  const {id} = req.params;
  const {variantType,variant,count} = req.body; 
  const product = await db.products.findOne({where:{id:id}});
  if(!product){
    resp.status = false;
    resp.content.data = {message: `Product with id ${id} doest not exists.`};
    res.status(400).json(resp);return;
  }
  if(product.dataValues.seller != user.id){
    resp.status = false;
    resp.content.data = {message: "Only product sellers can add its variants."};
    res.status(400).json(resp);return;
  }
  if(!variant || !variantType || !count){
    resp.status = false;
    resp.content.data = {message: "All fields are required."};
    res.status(400).json(resp);return;
  }
  const variants  = variant.split(',');
  const counts = count.split(',');
  if(variants.length != counts.length){
    resp.status = false;
    resp.content.data = {message: "No of variants must be equal to no of counts."};
    res.status(400).json(resp);return;
  }
  for(const c of counts){
    if(isNaN(c)){
      resp.status = false;
      resp.content.data = {message: `${c} is the counts is not a number.`};
      res.status(400).json(resp);return;
    }
  }
  const variantDB = await db.variants.create({
    id: Snowflake.generate(),
    product: id,
    variant_type: variantType,
    variant: variant,
    count: count
  });
  resp.status = true;
  resp.content.data = variantDB;
  res.status(201).json(resp);return;
})

const updateVariant = asyncHandler(async(req,res)=>{
  const user = req.user;
  var {variantType,variant,count} = req.body;
  const {id,vid} = req.params;
  const product = await db.products.findOne({where:{id:id}});
  if(!product){
    resp.status = false;
    resp.content.data = {message: `Product with id ${id} doest not exists.`};
    res.status(400).json(resp);return;
  }
  if(product.dataValues.seller != user.id){
    resp.status = false;
    resp.content.data = {message: "Only product sellers can add its variants."};
    res.status(400).json(resp);return;
  }
  if(!variant && !variantType && !count){
    resp.status = false;
    resp.content.data = {message: "Atleast one field is required."};
    res.status(400).json(resp);return;
  }
  const variantDB = await db.variants.findOne({where:{id:vid}});
  if(!variantDB){
    resp.status = false;
    resp.content.data = {message: `Variant with id ${vid} doest not exists.`};
    res.status(400).json(resp);return;
  }
  if(!variantType){
    variantType = variantDB.dataValues.variant_type;
  }
  if(!variant){
    variant = variantDB.dataValues.variant;
  }
  if(!count){
    count = variantDB.dataValues.count;
  }
  const variants  = variant.split(',');
  const counts = count.split(',');
  if(variants.length != counts.length){
    resp.status = false;
    resp.content.data = {message: "No of variants must be equal to no of counts."};
    res.status(400).json(resp);return;
  }
  for(const c of counts){
    if(isNaN(c)){
      resp.status = false;
      resp.content.data = {message: `${c} is the counts is not a number.`};
      res.status(400).json(resp);return;
    }
  }
  const update = await db.variants.update({
    variant_type:variantType,
    variant: variant,
    count: count
  },{where:{id:vid}});
  resp.status = true;
  resp.content.data = update;
  res.status(200).json(resp);return;
});


const deleteVariant = asyncHandler(async(req,res)=>{
  const user = req.user;
  const {id,vid} = req.params;
  const product = await db.products.findOne({where:{id:id}});
  if(!product){
    resp.status = false;
    resp.content.data = {message: `Product with id ${id} doest not exists.`};
    res.status(400).json(resp);return;
  }
  if(product.dataValues.seller != user.id){
    resp.status = false;
    resp.content.data = {message: "Only product sellers can add its variants."};
    res.status(400).json(resp);return;
  }
  const variant = await db.variants.findOne({where:{id:vid}});
  if(!variant){
    resp.status = false;
    resp.content.data = {message: `Variant with id ${vid} doest not exists.`};
    res.status(400).json(resp);return;
  }
  await db.variants.destroy({where:{id:vid}});
  resp.status = true;
  resp.content.data = {message: "Successfully Deleted."}
  res.status(200).json(resp);return;
})

module.exports = {
  addVariant,
  updateVariant,
  deleteVariant
}