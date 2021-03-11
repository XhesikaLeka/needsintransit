const httpStatus = require('http-status');
const { Suggestion } = require('../models');
const ApiError = require('../utils/ApiError');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}
/**
 * Send an email
 * @param {string} subject
 * @param {string} html
 * @returns {Promise}
 */
const sendEmail = async (subject, html) => {
  const msg = { from: config.email.from, to: config.email.to, subject, html };
  await transport.sendMail(msg);
};
/**
 * Create a lcoation
 * @param {Object} suggestionBody
 * @returns {Promise<Suggestion>}
 */
const createSuggestion = async (suggestionBody) => {
  // if (await Suggestion.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  console.log("inside create suggestion")
  const suggestion = await Suggestion.create(suggestionBody);
  return suggestion;
};

/**
 * Query for suggestions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySuggestions = async (filter, options) => {
  const suggestions = await Suggestion.paginate(filter, options);
  return suggestions;
};

module.exports = {
  createSuggestion,
  querySuggestions,
  sendEmail,
};