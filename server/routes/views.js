const router = require('express').Router();
const User = require('../models/User');
const Destination = require('../models/Destination')

router.get('/register', (req, res) => {
    if (req.session.user) res.redirect('/profile');
    else res.render('register.hbs', {
        title: 'Web Travel Agency - Sign Up'
    });
});
router.get('/login', (req, res) => {
    if (req.session.user) res.redirect('/profile');
    else res.render('login.hbs', {
        title: 'Web Travel Agency - Login'
    });
});
router.get('/logout', (req, res) => {
    req.session.destroy();  
    res.redirect('/');
})
module.exports = router;