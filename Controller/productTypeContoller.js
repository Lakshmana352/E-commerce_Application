const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {}
};

const createProductType = asyncHandler(async(req,res)=>{
  const {name} = req.body;
  if(!name){
    resp.status = false;
    resp.content.data = {message: `Name is required for ProductType.`}
    res.status(400).json(resp);return;
  }
  const check = await db.productType.findOne({where:{name:name}});
  if(check){
    resp.status = false;
    resp.content.data = {message: `ProductType with name ${name} already exists.`}
    res.status(400).json(resp);return;
  }
  const productType = await db.productType.create({
    id: Snowflake.generate(),
    name: name
  });
  resp.status = true;
  resp.content.data =productType;
  res.status(201).json(resp);return;
});


const getProductType = asyncHandler(async(req,res) => {
  const productType = await db.productType.findAll();
  resp.status = true;
  resp.content.data = productType;
  res.status(200).json(resp);return;
})


module.exports = {
  createProductType,
  getProductType
}
