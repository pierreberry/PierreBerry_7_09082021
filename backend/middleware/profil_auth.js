
const Profil = require("../models/UserProfils");

module.exports = (req, res, next) => {
    Profil.findOne({ where: { id: req.params.id } })
    .then((profil) => {      
        if (req.tokenAccountId !== profil.fk_user_credential) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    })
    .catch(error => res.status(400).json({message : 'Erreur' + error}) )
};