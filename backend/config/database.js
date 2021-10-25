'use strict'
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

const db = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USERNAME}`, `${process.env.DATABASE_PASSWORD}`, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
    define: {
        timestamps: false
    }
});

module.exports = db;