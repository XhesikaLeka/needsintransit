const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createSuggestion = {
  body: Joi.object().keys({
    locationname: Joi.string().required(),
    description : Joi.string(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    category: Joi.string().required(),
    contact : Joi.object().keys({
      email : Joi.string().empty (''),
      phone_no : Joi.number().empty (''),
      
    }),
  }),
};

const getSuggestions = {
  // query: Joi.object().keys({
  //   name: Joi.string(),
  //   role: Joi.string(),
  //   limit: Joi.number().integer(),
  //   page: Joi.number().integer(),
  // }),
};



module.exports = {
  createSuggestion,
  getSuggestions,
};
