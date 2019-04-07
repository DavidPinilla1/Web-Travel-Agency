const router = require('express').Router();
const config = require('../config/password')
const User = require('../models/User');
const Destinations = require('../models/Destination')
const transporter = require('../config/nodemailer');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const passport = require('passport')
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
    new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }).save().then(user => res.status(201).send({
        message: 'user succesfully created, please confirm your email ',
        user
    })).catch(err => send.res(err))
});
router.get('/confirmation/:token', (req, res) => {
    const email = jwt.verify(req.params.token, config.EMAIL_SECRET).user;
    User.findOne({
        email
    }).then(userFound => {
        console.log('confirmation of ' + userFound.email)
        userFound.confirmed = true
        userFound.save().then(user => {
            console.log(userFound)
            req.login(userFound._id, err => {
                Destinations.find({}).then(destinations => {
                    res.render('index.hbs', {
                        title: 'Web Travel Agency',
                        destinations,
                        user,
                        message: 'Congratulations! Your email account has been verified.',
                        //     redirect:'/profile'
                    })
                })
            })
        }).catch(console.log)
    }).catch(console.log)
})
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(userFound => {
        if (!userFound) return res.json({
            message: 'Email or password wrong'
        })
        bcrypt.compare(req.body.password, userFound.password).then(isMatch => {
            if (!isMatch) return res.json({
                message: 'Email or password wrong'
            })
            req.login(userFound._id, err => {
                res.redirect('/profile')
            })
        }).catch(err => res.send(err))
    })
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
module.exports = router;