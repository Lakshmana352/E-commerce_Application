module.exports = (sequelize,DataTypes) => {
  const variantType = sequelize.define('variant_type',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return variantType;
}