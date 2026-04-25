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
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note'
})

Note.sync()

module.exports = Note