const router = require('express').Router();
const Destination=require('../models/Destination')
router.get('/',(req,res)=>{
    res.send('destinations')
})
router.get('/:id', (req, res) => {
    Destination.findById(req.params.id).then(destination => res.send(destination)).catch(err => res.status(500).send(err))
})
router.post('/add',(req,res)=>{
    new Destination(req.body).save()
    .then(destination => res.status(201).send(destination))
    .catch(err => res.status(400).send(err))
})
router.delete('/:id', (req, res) => {
    Destination.findByIdAndDelete(req.params.id).then(destination => res.send(destination)).catch(err => res.status(500).send(err))
})
router.patch('/:id', (req, res) => {
    Destination.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true,  runValidators: true })
        .then(destination => res.send(destination)).catch(err => res.status(500).send(err))
})
module.exports = router
