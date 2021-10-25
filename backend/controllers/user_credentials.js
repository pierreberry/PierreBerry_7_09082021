'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator')
const emailValidator = require('email-validator')
const password = new passwordValidator()

const Account = require('../models/UserCredentials');

exports.getAccount = (req, res) => {
    Account.findAll()
        .then(accounts => {
            res.status(200)
            res.send(accounts)
        })
        .catch(error => res.status(400).send(error))
}

exports.signup = (req, res) => {
    password
        .is().min(6)
        .is().max(100)
        .has().uppercase(1)
        .has().digits(1)
        .has().symbols(1)
    if (!password.validate(req.body.password)) {
        return res.status(401).send(`Mauvais format de mot de passe !
        6 caractères minimum | 1 majuscule | 1 symbols | 1 nombre requis`)
    }
    if (!emailValidator.validate(req.body.emailAddress)) {
        return res.status(401).send(`Mauvais format d'email !`)
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            Account.create({
                emailAddress: req.body.emailAddress,
                password: hash
            })
            .then((account) => account.createProfil({}))
            .then(() => res.status(201).json({ message: 'Compte créé !' }))
            .catch(error => res.status(400).send( 'Adresse email déjà utilisé' ))
        })
        .catch(error => res.status(500).send( error ))
}

exports.login = (req, res) => {
    Account.findOne({where: { emailAddress: req.body.emailAddress } })
        .then(account => {
            if (!account) {
                return res.status(401).send('Compte non trouvé !')
            }
            bcrypt.compare(req.body.password, account.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).send('Mot de passe incorrect !')
                    return 
                }
                    res.status(201).json({
                        message: 'Connecté en tant que ' + account.emailAddress + ' !',
                        accountId: account.uid,
                        token: jwt.sign(
                            { accountId: account.uid },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
};

exports.deleteAccount = (req, res) => {
    Account.destroy( { where: { emailAddress: req.body.emailAddress }})
        .then(() => res.status(200).json({ message: 'Compte supprimé !' }))
        .catch(error => res.status(400).send(error));  
}
