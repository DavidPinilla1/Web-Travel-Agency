const router = require('express').Router();
const User = require('../models/User');
const Destinations = require('../models/Destination')

router.get('/', (req, res) => {
    Destinations.find({}).then(destinations => {
        res.render('index.hbs', {
            title: 'Web Travel Agency',
            destinations: destinations,
        });
    })
});
module.exports = router;