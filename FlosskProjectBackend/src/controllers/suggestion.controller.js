const httpStatus = require('http-status');
const ejs = require('ejs');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { suggestionService } = require('../services');

const createSuggestion = catchAsync(async (req, res) => {
  console.log(req.body.locationname);
  const suggestion = await suggestionService.createSuggestion(req.body);
  const subject = ejs.render('Hello admin, a new location was suggested, please take a look at it.');
  const text = ejs.render('<b>Location name: </b> <%= locationname %><br><b>Location category:</b> <%= category %></b><br><b>Location coordinates:</b> <%= lat %>,<%= long %><br><b>Contact options:</b> <%= contact.email %> <%= contact.phone_no %>', req.body);
  const sendEmail = await suggestionService.sendEmail(subject,text);
  res.status(httpStatus.CREATED).send(suggestion);
});

const getSuggestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category', 'test']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  console.log(filter)
  const result = await suggestionService.querySuggestions(filter, options);
  res.send(result);
});
module.exports = {
  createSuggestion,
  getSuggestions,
};