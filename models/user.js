const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  cohort: {
    type: String,
    required: true,
    maxlength: 10,
    default: 'cohort-42',
  },
});

module.exports = mongoose.model('user', userSchema);
