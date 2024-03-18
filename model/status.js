module.exports = (sequelize,DataTypes) => {
  const status = sequelize.define('status',{
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  return status;
}