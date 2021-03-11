const httpStatus = require('http-status');
const { Location } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a lcoation
 * @param {Object} locationBody
 * @returns {Promise<Location>}
 */
const createLocation = async (locationBody) => {
  // if (await Location.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  console.log("inside create location")
  const location = await Location.create(locationBody);
  return location;
};

/**
 * Query for locations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLocations = async (filter, options) => {
  const locations = await Location.paginate(filter, options);
  return locations;
};

/**
 * Get lcoation by id
 * @param {ObjectId} id
 * @returns {Promise<Location>}
 */
const getLocationById = async (id) => {
  return Location.findById(id);
};

/**
 * Get location by category
 * @param {string} category
 * @returns {Promise<Location>}
 */
const getLocationByCategory= async (category) => {
  return Location.find({ category });
};

/**
 * Update location by id
 * @param {ObjectId} locationId
 * @param {Object} updateBody
 * @returns {Promise<Location>}
 */
const updateLocationById = async (locationId, updateBody) => {
  const location = await getLocationById(locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
//   if (updateBody.email && (await Location.isEmailTaken(updateBody.email, locationId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
  Object.assign(location, updateBody);
  await location.save();
  return location;
};

/**
 * Delete location by id
 * @param {ObjectId} locationId
 * @returns {Promise<Location>}
 */
const deleteLocationById = async (locationId) => {
  const location = await getLocationById(locationId);
  if (!location) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Location not found');
  }
  await location.remove();
  return location;
};

module.exports = {
  createLocation,
  queryLocations,
  getLocationById,
  getLocationByCategory,
  updateLocationById,
  deleteLocationById,
};
