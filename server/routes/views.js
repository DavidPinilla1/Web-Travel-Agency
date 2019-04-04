const router = require('express').Router();
const User = require('../models/User');
const Destination = require('../models/Destination')

router.get('/register', (req, res) => {
    Destination.find({}).then(destinations => {
        res.render('register.hbs', {
            title: 'Web Travel Agency',
            destinations,
        });
    }).catch(console.log)
});
module.exports = router;