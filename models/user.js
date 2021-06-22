const mongoose = require('mongoose');

const Myschema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Myschema({
  username: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  email: String,
  passwordReset: { type: String, select: false },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
