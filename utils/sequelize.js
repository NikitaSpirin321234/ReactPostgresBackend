const { Sequelize } = require('sequelize')
const config = require('./config')
const logger = require('./logger')

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
})

logger.info('connecting to', config.DATABASE_URL)

module.exports = sequelize