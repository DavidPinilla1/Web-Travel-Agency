const mongoose = require('mongoose')
const { pick } = require('lodash')
const { isEmail } = require('validator')
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
  confirmed:{
    type:Boolean,
    defaultValue:false
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
  const user = this;
  return pick(user, ['_id', 'name', 'email'])
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I).then(salt => bcrypt.hash(user.password, salt).then(hash => {
        user.password = hash;
        next();
      }).catch(err => next(err)))
      .catch(err => next(err))
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password).then(isMatch => cb(null, isMatch))
    .catch(cb)
};
UserSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), SECRET);
  user.token = token;
  user.save().then(user => cb(null, user)).catch(err => cb(err))
};
UserSchema.statics.findByToken = function (token, cb) {
  const user = this;
  jwt.verify(token, SECRET).then(decode => {
    user.findOne({
      _id: decode,
      token: token
    }).then(user => cb(null, user)).catch(err => cb(err))
  }).catch(err => res.status(500).send(err))
};

UserSchema.methods.deleteToken = function (token, cb) {
  const user = this;
  user.update({ $unset: { token: 1 } }).then(user => cb(null, user)).catch(err => cb(err))
};
const User = mongoose.model('user', UserSchema)

module.exports = User;