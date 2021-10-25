const Posts = require("../models/Posts");

module.exports = (req, res, next) => {
    Posts.findOne({ where: { id: req.params.postId } })
    .then((post) => {
            if (req.tokenAccountId !== post.fk_users_profil) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        })
        .catch(error => res.status(400).json({message : 'Erreur' + error}) )

};