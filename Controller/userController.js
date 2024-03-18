const db = require("../model");
const asyncHandler = require('express-async-handler');
const {Snowflake} = require('@theinternetfolks/snowflake');
const {getToken} = require('../middleware/auth');
const bcrypt = require('bcrypt');

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
const signUp = asyncHandler(async(req,res)=>{
  const {name,email,role,password} = req.body;
  const resp = {
    status: true,
    content: {
      data: {}
    }
  }
  if(!name || !email || !password || !role){
    resp.status = false;
    resp.content.data.message = "All fields are neccesary.";
    res.status(400).json(resp);
    return;
  }
  if(!isValidEmail(email)){
    resp.status = false;
    resp.content.data.message = "Email is not valid.";
    res.status(400).json(resp);
    return;
  }
  if(!isStrongPassword(password)){
    resp.status = false;
    resp.content.data.message = `${password} is not as strong password.`;
    res.status(400).json(resp);
    return;
  }
  const checkUser = await db.users.findOne({where:{email:email}});
  if(checkUser){
    resp.status = false;
    resp.content.data.message = `User already exists with email ${email}.`;
    res.status(400).json(resp)
    return;
  }
  const checkRole = await db.role.findOne({where:{id:role}});
  if(!checkRole){
    resp.status = false;
    resp.content.data.message = `Role with id ${role} does not exists.`;
    res.status(400).json(resp)
    return;
  }
  // req.body.id = Snowflake.generate();
  let salt = process.env.SALT;
  salt = Number(salt);
  const hashPassword = await bcrypt.hash(password,salt);
  console.log('Salt');
  const user = await db.users.create({
    id: Snowflake.generate(),
    name: name,
    email: email,
    role: role,
    password: hashPassword
  });
  const accesstoken = getToken(user.dataValues);
  // const resp = {
  //   status: true,
  //   content: {
  resp.content.data = {
    id: user.dataValues.id,
    name: user.dataValues.name,
    email: user.dataValues.email,
    created_at: user.dataValues.createdAt 
  }
  resp.content.meta =  {
    accesstoken: accesstoken
  }
  //   }
  // };
  res.status(200).json(resp);
  return;
});

const signIn = asyncHandler(async(req,res)=>{
  const {email,password} = req.body;
  const resp = {
    status: true,
    content: {}
  };
  if(!email || !password){
    resp.status = false;
    resp.content.data = {message: "All fields are neccesary."};
    res.status(400).json(resp);
    return;
  }
  const user = await db.users.findOne({where:{email:email}});
  if(!user){
    resp.status = false;
    resp.content.data = {message: `User with email ${email} does not exists.`};
    res.status(404).json(resp);
    return;
  }
  if(!(await bcrypt.compare(password,user.password))){
    resp.status = false;
    resp.content.data = {message: `Password does not match with existing password.`};
    res.status(400).json(resp);
    return;
  }
  const access_token = getToken(user.dataValues);
  resp.content.data = {
    id: user.dataValues.id,
    name: user.dataValues.name,
    email: user.dataValues.email,
    role: user.dataValues.role,
    created_at: user.dataValues.createdAt
  };
  resp.content.meta = {access_token: access_token};
  res.status(200).json(resp);
})

module.exports = {
  signUp,
  signIn
};