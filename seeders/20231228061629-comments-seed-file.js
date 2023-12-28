'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 在Users資料庫撈出現有的資料
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // 在Restaurants資料庫撈出現有的資料
    const restaurants = await queryInterface.sequelize.query(
      'SELECT id FROM Restaurants;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Comments',
      Array.from({ length: 100 }, () => ({
        text: faker.lorem.sentence(), // 生出假句子
        restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', {})
  }
}
