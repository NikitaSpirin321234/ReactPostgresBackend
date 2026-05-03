const Note = require('../models/note')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] } // Опционально: исключить хэш пароля
  })
  // Sequelize возвращает экземпляры моделей, .toJSON() преобразует в простые объекты
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb
}