module.exports = (sequelize,DataTypes) => {
  const productType = sequelize.define('product_type',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return productType;
}