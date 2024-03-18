const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {}
};

const createVariantType = asyncHandler(async(req,res)=>{
  const {name} = req.body;
  if(!name){
    resp.status = false;
    resp.content.data = {message: `Name is required for VariantType.`}
    res.status(400).json(resp);return;
  }
  const check = await db.variantType.findOne({where:{name:name}});
  if(check){
    resp.status = false;
    resp.content.data = {message: `VariantType with name ${name} already exists.`}
    res.status(400).json(resp);return;
  }
  const variantType = await db.variantType.create({
    id: Snowflake.generate(),
    name: name
  });
  resp.status = true;
  resp.content.data =variantType;
  res.status(201).json(resp);return;
});


const getVariantType = asyncHandler(async(req,res) => {
  const variantType = await db.variantType.findAll();
  resp.status = true;
  resp.content.data = variantType;
  res.status(200).json(resp);return;
})


module.exports = {
  createVariantType,
  getVariantType
}
