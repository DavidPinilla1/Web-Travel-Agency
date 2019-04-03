const mongoose = require('mongoose')
const { pick } = require('lodash')
const {isEmail} = require('validator')
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
        unique: true,
        trim: true,
        validate: {
            isAsync: true,
            validator: (email)=> isEmail(email),
            message: 'the {VALUE} entered is not a valid email.'
            }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
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