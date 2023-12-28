'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.belongsToMany(models.Restaurant, {
        through: models.Favorite,
        foreignKey: 'userId',
        as: 'FavoritedRestaurants'
      })
      User.belongsToMany(models.Restaurant, {
        through: models.Like,
        foreignKey: 'userId', // 透過Like的userId去找查找資料，找出對應的restaurantId資料，取名為LikedRestaurants
        as: 'LikedRestaurants'
      })
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followingId', // 透過Followship的followingId去查找資料可找出對應的followerId資料，取為別名Followers
        as: 'Followers' // 透過Followers，得知有誰在追蹤User
      })
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followerId', // 透過Followship的followerId去查找資料，可找出對應followingId的資料，取為別名為Followings
        as: 'Followings' // 透過Followings，得知User追蹤的人有誰
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
