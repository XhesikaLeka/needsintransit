const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createLocation = {
  body: Joi.object().keys({
    locationname: Joi.string().required(),
    description: Joi.string(),
    lat: Joi.number().required(),
    long: Joi.number().required(),
    category: Joi.string().required(),
    contact : Joi.object().keys({
      email : Joi.string().empty (''),
      phone_no : Joi.number().empty (''),
      
    }),
  }),
};

const getLocations = {
  // query: Joi.object().keys({
  //   name: Joi.string(),
  //   role: Joi.string(),
  //   limit: Joi.number().integer(),
  //   page: Joi.number().integer(),
  // }),
};
const getLocationsByCategory = {
 

};

const getLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

const updateLocation = {
  params: Joi.object().keys({
    locationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      locationname: Joi.string(),
    })
    .min(1),
};

const deleteLocation = {
  params: Joi.object().keys({
    locationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
