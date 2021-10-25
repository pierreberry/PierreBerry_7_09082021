'use strict'
const {Sequelize, Model} = require("sequelize");
const sequelize = require('../config/database');

class Posts extends Model{}

Posts.init({
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        field: 'title',
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        field: 'text',
        type: Sequelize.TEXT,
    },
    picture: {
        field: 'picture',
        type: Sequelize.STRING,
    },
    video: {
        field: 'video',
        type: Sequelize.STRING,
    }
    }, {
    sequelize,
    modelName: 'Posts',
    tableName: 'posts'
});


module.exports = Posts;

