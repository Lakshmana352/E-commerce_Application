const asyncHandler = require("express-async-handler");
const db = require("../model");
const {Snowflake} = require("@theinternetfolks/snowflake");

const resp = {
  status: false,
  content: {}
};

const createStatus = asyncHandler(async(req,res)=>{
  const {name} = req.body;
  if(!name){
    resp.status = false;
    resp.content.data = {message: `Name is required for Status.`}
    res.status(400).json(resp);return;
  }
  const check = await db.status.findOne({where:{name:name}});
  if(check){
    resp.status = false;
    resp.content.data = {message: `Status with name ${name} already exists.`}
    res.status(400).json(resp);return;
  }
  const status = await db.status.create({
    id: Snowflake.generate(),
    name: name
  });
  resp.status = true;
  resp.content.data =status;
  res.status(201).json(resp);return;
});


const getStatus = asyncHandler(async(req,res) => {
  const status = await db.status.findAll();
  resp.status = true;
  resp.content.data = status;
  res.status(200).json(resp);return;
})


module.exports = {
  createStatus,
  getStatus
}
