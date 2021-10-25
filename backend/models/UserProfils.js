'use strict'
const {Sequelize, Model} = require("sequelize");
const sequelize = require('../config/database');

class UserProfils extends Model{}

UserProfils.init({
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profilPicture: {
        field: 'profil_picture',
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
        allowNull: true
    },
    nickname: {
        field: 'nickname',
        type: Sequelize.STRING,
        allowNull: true
    }
    }, {
    sequelize,
    modelName: 'UserProfils',
    tableName: 'user_profils'
});


module.exports = UserProfils;

