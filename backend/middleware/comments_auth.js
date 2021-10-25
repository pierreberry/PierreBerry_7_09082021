const Comments = require("../models/Comments");
const Posts = require("../models/Posts")

module.exports = async (req, res, next) => {
    try {        
        const post = await Posts.findOne({ where: { id: req.params.postId }})
        const comment = await Comments.findOne({ where: { id: req.params.commentId }})
        if (comment.fk_posts_comments !== post.id) {
            throw 'No match between comment id and post id';
        } else {
            next();
        }
    } catch(error) { res.status(400).json({ message: 'Erreur' + error }) }

};