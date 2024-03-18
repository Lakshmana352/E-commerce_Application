module.exports = (sequelize,DataTypes) => {
  const variants = sequelize.define('variant',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    product: {
      type: DataTypes.STRING
    },
    variant_type:{
      type: DataTypes.STRING
    },
    variant: {
      type: DataTypes.STRING
    },
    count: {
      type: DataTypes.STRING
    }
  });
  return variants;
}