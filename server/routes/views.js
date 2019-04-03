const router = require('express').Router();
const User = require('../models/User');
const Destinations = require('../models/Destination')

router.get('/register', (req, res) => {
    Destinations.find({}).then(destinations => {
        res.render('register.hbs', {
            title: 'Web Travel Agency',
            destinations: destinations,
        });
    })
});
module.exports = router;