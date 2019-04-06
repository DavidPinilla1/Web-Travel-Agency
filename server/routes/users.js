const router = require('express').Router();
const config = require('../config/password')
const User = require('../models/User');
const Destinations = require('../models/Destination')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: config.GMAIL.email,
        pass: config.GMAIL.password
    }
})
router.post('/signup', (req, res) => {
    jwt.sign({
        user: req.body.email
    }, config.EMAIL_SECRET, {
        expiresIn: '2d'
    }, (err, emailToken) => {
        if (err) return res.send(err)
        const url = `http://localhost:3001/users/confirmation/${emailToken}`
        transporter.sendMail({
            to: req.body.email,
            subject: 'Confirm your email in Travel Agency',
            html: `Please click the following link to confirm your email:<br>
                <a href="${url}">Click here to confirm your email</a><br>
                    The link above will expire in 48 hours.
                 `
        }).then(console.log).catch(console.log)
    })
    new User(req.body).save().then(user => res.status(201).send({
        message: 'user succesfully created, please confirm your email ',
        user
    }))
});
router.get('/confirmation/:token', (req, res) => {
    const email = jwt.verify(req.params.token, config.EMAIL_SECRET).user;
    User.findOne({
        email
    }).then(userFound => {
        console.log('confirmation of ' + userFound.email)
        userFound.confirmed = true
        userFound.save().then(user=>{
            Destinations.find({}).then(destinations => {
            res.render('index.hbs', {
                title: 'Web Travel Agency',
                destinations: destinations,
                user,
                message:'Congratulations! Your email account has been verified.'
            })})
        }).catch(console.log)
    }).catch(console.log)
})
module.exports = router;