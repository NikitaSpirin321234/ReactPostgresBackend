const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

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
    },
    // 🔗 Внешний ключ на пользователя
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // или false, если заметка всегда должна иметь автора
        references: {
            model: 'users', // имя таблицы в БД (underscored: true → 'users')
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // или 'CASCADE', если удалять заметки при удалении пользователя
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

Note.sync()

module.exports = Note