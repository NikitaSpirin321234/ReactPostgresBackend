const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
// const { Sequelize } = require('sequelize')

const app = express()

const sequelize = require('./utils/sequelize')

// logger.info('connecting to', config.DATABASE_URL)

// const sequelize = new Sequelize(config.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
// })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app