'use strict'
const {Sequelize, Model} = require("sequelize");
const sequelize = require('../config/database');

class UserCredentials extends Model{}

UserCredentials.init({
    uid: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    emailAddress: {
      field: 'email_address',
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      field: 'password',
      type: Sequelize.CHAR(60),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserCredentials',
    tableName: 'user_credentials'
});

module.exports = UserCredentials;