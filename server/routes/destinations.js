const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('destinations')
})
module.exports = router
