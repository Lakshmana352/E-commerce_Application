const {Sequelize, DataTypes} = require("sequelize");

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pw = process.env.DB_PW;
const db_host = process.env.DB_HOST;
const sequelize = new Sequelize(db_name,db_user,db_pw,{
  host: db_host,
  dialect: "mysql"
});

sequelize.authenticate()
  .then(()=>{
    console.log(`Database connection successful.`);
  })
  .catch((err)=>{
    console.log(`Error: ${err}`);
  });

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize,DataTypes);
db.role = require("./role")(sequelize,DataTypes);
db.products = require("./product")(sequelize,DataTypes);
db.productType = require("./productType")(sequelize,DataTypes);
db.variants = require("./variants")(sequelize,DataTypes);
db.buyers = require("./buyers")(sequelize,DataTypes);
db.status = require("./status")(sequelize,DataTypes);
db.variantType = require("./variantType")(sequelize,DataTypes);

db.role.hasMany(db.users,{foreignKey: 'role'});

db.users.hasMany(db.products,{foreignKey: 'seller'});
db.users.hasMany(db.buyers,{foreignKey: 'buyer'});

db.productType.hasMany(db.products,{foreignKey: 'product_type'});

db.products.hasMany(db.variants,{foreignKey: 'product'});

db.variants.hasMany(db.buyers,{foreignKey: 'variant'});

db.status.hasMany(db.buyers,{foreignKey: 'status'});

db.variantType.hasMany(db.variants,{foreignKey: 'varient_Type'});

db.sequelize.options.logging = false;

db.sequelize.sync({force:false})
  .then(()=>{
    console.log(`Database Sync is successful.`);
  })
  .catch((err)=>{
    console.log(`Error: ${err}`);
  });

module.exports = db;

