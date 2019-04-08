const router = require('express').Router();
const User = require('../models/User');
const Destinations = require('../models/Destination')

router.get('/', (req, res) => {
    Destinations.find({}).then(destinations => {
        let data={
            title: 'Travel Agency',
            destinations,
        }
        if(req.isAuthenticated())return User.findById(req.session.passport.user).then(user=>{
            res.render('index.hbs',{
            ...data,
            user
        })}) .catch(err=>console.log(err))
        res.render('index.hbs',data );
    })
});
module.exports = router;