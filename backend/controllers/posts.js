'use strict'
const Posts = require('../models/Posts');
const Profil = require('../models/UserProfils')
const fs = require('fs');


exports.getAllPosts = (req, res) => {
    Posts.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};

exports.getPost = (req, res) => {
    Posts.findOne({ where: { id: req.params.postId } })
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => res.status(400).json({error}))
}

exports.createPost = async (req, res) => {
    const request = JSON.parse(req.body.post)    
    try{
        const newPost = await Posts.create({
            title: request.title,
            text: request.text,
            picture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
        })
        const profil = await Profil.findOne({ where: { id: req.tokenAccountId }})
        await profil.addPost(newPost)
        res.status(201).json( newPost )
    } catch(error) { res.status(500).json( {message: '' + error.message} ) }
}


exports.updatePost = (req, res) => {
    let reqPost = JSON.parse(req.body.post)     
    if (reqPost.title.length > 255) {
            res.status(401).send('Titre trop long !')
    } else if (!reqPost.title) {
        res.status(401).send('Titre manquand !')
    } else {
        Posts.findOne({ where: { id: req.params.postId } })
        .then((post) => {
            let postObject = {
                title: reqPost.title ? reqPost.title : post.title,
                text: reqPost.text ? reqPost.text : post.text,
                picture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : post.picture
            }
            if (req.body.image === "toDelete") {
                postObject = {
                    title: reqPost.title ? reqPost.title : post.title,
                    text: reqPost.text ? reqPost.text : post.text,
                    picture: ''
                }
            }
            updatePostDatabase(req, res, postObject)
        })
        .catch(error => res.status(400).json({message : 'Message' + error}) )
    }
}

function updatePostDatabase(req, res, postObject){
    Posts.findOne({ where: { id: req.params.postId } })
    .then((post) => {
        Posts.update( postObject , { where: {id: post.id} })
            .then(() => res.status(200).json( postObject ))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({message : 'Message' + error}) )
}

exports.deletePost = (req, res) => {
    Posts.destroy( { where: { id: req.params.postId }})
    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
    .catch(error => res.status(400).json({ message: 'Erreur' + error })); 
}