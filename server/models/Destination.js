const mongoose = require('mongoose')
const DestinationSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
        maxlength: 40,
    },
    imagePath:String,
    price: {
        type: Number,
        required: true
    },
    discount: Number
});
const Destination = mongoose.model('Destination', DestinationSchema)

module.exports = Destination;