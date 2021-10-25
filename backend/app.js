'use strict'
require('./models/index');
const express = require('express');
const path = require('path');
const db = require('./config/database');

const userCredentials = require('./routes/user_credentials');
const userProfils = require('./routes/user_profils');
const posts = require('./routes/posts')

db.authenticate()
    .then(() => console.log(`Connected at ${process.env.DATABASE_NAME} with ${process.env.DATABASE_USERNAME}`))
    .catch(err => console.log(err))

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    next();
});

app.use(express.json());

app.use('/api/auth', userCredentials);
app.use('/api/profil', userProfils);
app.use('/api/posts', posts);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;