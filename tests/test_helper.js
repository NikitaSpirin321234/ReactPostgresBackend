const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  // В Sequelize создание и сохранение объединены в методе create()
  const note = await Note.create({ content: 'willremovethissoon' })
  
  // Удаление экземпляра
  await note.destroy()
  
  // В Sequelize по умолчанию используется поле id, а не _id
  return note.id.toString()
}

const notesInDb = async () => {
  const notes = await Note.findAll()
  // Преобразуем экземпляры моделей в обычные JS-объекты
  return notes.map(note => note.get({ plain: true }))
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}