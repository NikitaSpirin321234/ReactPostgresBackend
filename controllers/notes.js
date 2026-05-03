const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.findAll()

  // console.log(JSON.stringify(notes))
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findByPk(request.params.id)
    if (note) {
      // console.log(note.toJSON())
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  try {
    // console.log('request.body: ', request.body)
    const body = request.body
    if (!body.content) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findByPk(body.userId)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const note = await Note.create({ ...body, date: new Date(), user: user._id })
    return response.status(201).json(note)
  } catch(error) {
    return response.status(400).json({ error })
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
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

notesRouter.put('/:id', async (request, response, next) => {
  try {
    const note = await Note.findByPk(request.params.id)
    if (note) {
      note.important = request.body.important
      await note.save()
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

module.exports = notesRouter
