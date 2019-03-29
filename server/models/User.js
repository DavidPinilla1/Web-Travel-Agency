const mongoose = require('mongoose')
const {
    pick
} = require('lodash')
const UserSchema = new mongoose.Schema({
    // _id,
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        //encriptarla
    }

});

UserSchema.methods.toJSON = function () {
    const user = this;
    return pick(user, ['_id', 'name', 'email'])
}

UserSchema.statics.findByCredentials = ({
    email,
    password
}) => {
    return User.findOne({
        email,
        password
    })
}

const User = mongoose.model('user', UserSchema)

module.exports = User;