require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

app.use(express.static('dist'))

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
})

Note.sync()

app.use(express.json())

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll()

  console.log(JSON.stringify(notes))
  res.json(notes)
})

app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      console.log(note.toJSON())
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

app.put('/api/notes/:id', async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      note.important = req.body.important
      await note.save()
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch(error) {
    next(error)
  }

})

app.delete('/api/notes/:id', async (request, response, next) => {
  try {
    const record = await Note.findByPk(request.params.id)
    if(record) {
      await record.destroy()
      response.status(204).end()
    }
  } catch(error) {
    next(error)
  }
})

app.post('/api/notes', async (req, res) => {
  try {
    console.log('req.body: ', req.body)
    const body = req.body
    if (!body.content) {
      return res.status(400).json({ error: 'content missing' })
    }
    const note = await Note.create({ ...body, date: new Date() })
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  // console.error(error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
