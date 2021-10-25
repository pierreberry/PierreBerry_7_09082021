'use strict'
const Profil = require('../models/UserProfils');

exports.getProfil = (req, res) => {
    Profil.findOne({ where: { id: req.params.id } })
	.then(profil => {
        res.status(200).json(profil) 
    })        
	.catch(error => res.status(400).send(error))
}

exports.updateProfil = (req, res) => {
    let reqProfil = JSON.parse(req.body.profil)
    
    if (reqProfil.name.length > 255) {
        res.status(401).send('Votre nom ne peux dépasser 255 caractères')
    } else if (reqProfil.nickname.length > 255) {
        res.status(401).send('Votre prénom ne peux dépasser 255 caractères')
    } else {
        Profil.findOne({ where: { id: req.params.id } })
        .then((profil) => {
            let profilObject = {
                name: reqProfil.name ? reqProfil.name : profil.name,
                nickname: reqProfil.nickname ? reqProfil.nickname : profil.nickname,
                profilPicture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : profil.profilPicture
            }
            updateProfilDatabase(req, res, profilObject)
        })
    }
    
}

function updateProfilDatabase(req, res, profilObject) {
    Profil.findOne({ where: { id: req.params.id } })
    .then((profil) => {
        Profil.update( profilObject , { where: {id: profil.id} })
            .then(() => res.status(200).json( profilObject ))
            .catch(error => res.status(401).send( error ));
    })
    .catch(error => res.status(400).json({message : 'Erreur' + error}) )
}