const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
    defaultScope: {
        // Исключаем passwordHash из всех запросов по умолчанию
        attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
        // Скоуп для случаев, когда пароль нужен (например, при логине)
        withPassword: {
            attributes: {}
        }
    }
})

// Аналог toJSON из Mongoose — скрываем чувствительные данные
User.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.passwordHash
    // delete values._id // если вдруг появится
    return values
}

User.sync()

module.exports = User