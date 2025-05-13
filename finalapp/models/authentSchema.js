const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const AuthSchema = sequelize.define(
  'authent',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 15],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
        validate: {
            isEmail: true,
        },
        unique: true,

    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin'],
        defaultValue: 'user',
      },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'authent',
  }
);

module.exports = {AuthSchema};
