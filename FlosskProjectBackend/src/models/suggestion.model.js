const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const suggestionSchema = mongoose.Schema({
  locationname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  contact: {
      phone_no: {
          type: Number,
          required: false,
          lenght: 10,
      },
      email: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        }
    }
  }
}, {
  timestamps: true,
});

// add plugin that converts mongoose to json
suggestionSchema.plugin(toJSON);
suggestionSchema.plugin(paginate);

/**
 * @typedef Suggestion
 */
const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;
