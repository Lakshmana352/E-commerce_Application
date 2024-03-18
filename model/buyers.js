module.exports = (sequelize,DataTypes) => {
  const buyers = sequelize.define('buyer',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    buyer: {
      type: DataTypes.STRING
    },
    variant: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    count: {
      type: DataTypes.INTEGER
    }
  });
  return buyers;
}