const mongoose = require('mongoose')
const {
  pick
} = require('lodash')
const {
  isEmail
} = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = require('../config/password').SECRET
const SALT_I = 9;
const UserSchema = new mongoose.Schema({
  // _id,
  name: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      isAsync: true,
      validator: (email) => isEmail(email),
      message: 'the {VALUE} entered is not a valid email.'
    }
  },
  confirmed: {
    type: Boolean,
    defaultValue: false
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  imagePath: String
}, {
  timestamps: true
});

UserSchema.methods.toJSON = function () {
  const user = this;
  return pick(user, ['_id', 'name', 'email'])
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I).then(salt => bcrypt.hash(user.password, salt).then(hash => {
      user.password = hash;
      return next();
    }).catch(err => next(err))).catch(err => next(err))
  } else next();
});
UserSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update;
    bcrypt.genSalt(SALT_I).then(salt => bcrypt.hash(user.password, salt).then(hash => {
      console.log('hash: '+hash)
      console.log('user.password: '+user.password)
      user.password = hash;
      return next();
    }).catch(err => next(err))).catch(err => next(err))
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password).then(isMatch => cb(null, isMatch))
    .catch(cb)
};
const User = mongoose.model('user', UserSchema)

module.exports = User;