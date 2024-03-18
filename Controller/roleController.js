const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {}
};

const createRole = asyncHandler(async(req,res)=>{
  const {name} = req.body;
  if(!name){
    resp.status = false;
    resp.content.data = {message: `Name is required for role.`}
    res.status(400).json(resp);return;
  }
  const check = await db.role.findOne({where:{name:name}});
  if(check){
    resp.status = false;
    resp.content.data = {message: `Role with name ${name} already exists.`}
    res.status(400).json(resp);return;
  }
  const role = await db.role.create({
    id: Snowflake.generate(),
    name: name
  });
  resp.status = true;
  resp.content.data =role;
  res.status(201).json(resp);return;
});


const getRoles = asyncHandler(async(req,res) => {
  const roles = await db.role.findAll();
  resp.status = true;
  resp.content.data = roles;
  res.status(200).json(resp);return;
})


module.exports = {
  createRole,
  getRoles
}