module.exports = (sequelize,DataTypes) => {
  const products = sequelize.define('product',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    seller: {
      type: DataTypes.STRING
    },
    product_type: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return products;
}