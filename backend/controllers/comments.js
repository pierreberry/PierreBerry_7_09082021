'use strict'
const Posts = require('../models/Posts');
const Profil = require('../models/UserProfils')
const Comments = require('../models/Comments');


exports.getAllComments = (req, res) => {
    Posts.findOne({ where: { id: req.params.postId }})
    .then((post) => {
        Comments.findAll({where: { fk_posts_comments: post.id }})
            .then(comments => res.status(200).json(comments))
            .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(400).json({message : 'Erreur' + error}) )
};


exports.getComment = (req, res) => {
    Comments.findOne({ where: { id: req.params.commentId } })
	.then(comment => {
        res.status(200).json(comment)
    })        
	.catch(error => res.status(400).json({error}))
}

exports.createComment = async (req, res) => {
    try{
        if (!req.body.comment) {
            throw new Error('Pas de message')
        }
        const newComment = await Comments.create({ comment: req.body.comment })
        const post = await Posts.findOne({ where: { id: req.params.postId }})
        const profil = await Profil.findOne({ where: { id: req.tokenAccountId }})        
        await post.addPostComment(newComment)
        await profil.addUserComment(newComment)
        res.status(201).json( newComment )
    } catch(error) { res.status(400).json({ message: 'Erreur' + error }) }
}


exports.updateComment = (req, res) => {
    if (!req.body.comment) {
        res.status(401).send('Votre commentaire est vide, si vous souhaitez le supprimer, cliquez sur "Supprimer le commentaire".')
    } else {
        Comments.findOne({ where: { id: req.params.commentId } })
        .then((comment) => {
            Comments.update( {comment: req.body.comment} , { where: {id: comment.id} })
                .then(() => res.status(200).json( { id: req.params.commentId, comment: req.body.comment }))
                .catch(error => res.status(400).send( error ));
        })
        .catch(error => res.status(400).send(error) )
    }
}

exports.deleteComment = (req, res) => {
    Comments.destroy( { where: { id: req.params.commentId }})
    .then(() => res.status(200).json(  req.params.commentId  ))
    .catch(error => res.status(400).json({ message: 'Erreur' + error })); 
}