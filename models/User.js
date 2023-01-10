const { Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database')
const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pass:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = User