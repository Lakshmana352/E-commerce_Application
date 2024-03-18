const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY
const resp = {
  status: true,
  content: {}
}

const getToken = (user) => {
  const access_token = jwt.sign(user,secretKey,{expiresIn: '15m'});
  if(!access_token){
    resp.content.data = {message: `Internal server error try again.`}
    res.status(500).json(resp);
    return;
  }
  return access_token;
}

const authenticateToken = (req,res,next) => {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  if(!token){
    resp.content.data = {message: `Token not found.`};
    res.status(400).json(resp);
    return;
  }
  jwt.verify(token,secretKey,function(err,user){
    if(err){
      resp.content.data = {message: `Token is not valid.`};
      res.status(400).json(resp);
      return;
    }
    req.user = user;
    next();
  })
};

module.exports = {
  getToken,
  authenticateToken
}