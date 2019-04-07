const router = require('express').Router();
const User = require('../models/User');
const auth =require('../middleware/auth')
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) res.redirect('/profile');
    else res.render('register.hbs', {
        title: 'Travel Agency - Sign Up',
        flash:req.flash('info'),
    });
});
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) res.redirect('/profile');
    
    else res.render('login.hbs', {
        title: 'Travel Agency - Login',
    });
});
router.get('/profile',auth(), (req, res) => {
     res.render('profile.hbs', { title: 'Travel Agency - Profile'});
});
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;