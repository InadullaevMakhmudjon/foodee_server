
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
  }, {});
  Food.associate = (models) => {
    Food.belongsTo(models.Restaurant, { as: 'restaurant' });
    Food.belongsTo(models.Category, { as: 'category' });
  };
  return Food;
};