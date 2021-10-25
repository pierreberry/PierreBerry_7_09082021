'use strict'
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts')
const authMiddleware = require('../middleware/user_auth')
const postMiddleware = require('../middleware/post_auth')
const commentsCtrl = require('../controllers/comments')
const commentsMiddleware = require('../middleware/comments_auth')
const multer = require('../middleware/multer-config')


router.post('/', authMiddleware,  multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:postId', authMiddleware, postCtrl.getPost);
router.put('/:postId', authMiddleware, multer, postMiddleware, postCtrl.updatePost);
router.delete('/:postId', authMiddleware, postMiddleware, postCtrl.deletePost);
//router.post('/:postId/like', auth, postCtrl.likePost)
router.post('/:postId/comments', authMiddleware, commentsCtrl.createComment);
router.get('/:postId/comments', authMiddleware, commentsCtrl.getAllComments);
router.get('/:postId/comments/:commentId', authMiddleware, commentsMiddleware, commentsCtrl.getComment);
router.put('/:postId/comments/:commentId', authMiddleware, commentsMiddleware, commentsCtrl.updateComment);
router.delete('/:postId/comments/:commentId', authMiddleware, commentsMiddleware, commentsCtrl.deleteComment);

module.exports = router;