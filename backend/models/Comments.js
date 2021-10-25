'use strict'
const { Sequelize, Model } = require("sequelize");
const sequelize = require('../config/database');

class Comments extends Model { }

Comments.init({
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        field: 'comment',
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments'
});


module.exports = Comments;

