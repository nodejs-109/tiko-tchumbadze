const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const productSchema = sequelize.define(
    'product',
        {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            isDecimal: true,
            min: 0 
          }
        },
        sizes: {
          type: DataTypes.JSONB,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        colors: {
          type: DataTypes.JSONB,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
    }, {
        timestamps: true,
        tableName: 'products' 
});

module.exports = {productSchema};