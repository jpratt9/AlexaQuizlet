const request = require('request');
const Promise = require('promise');

let quizlet = 'https://api.quizlet.com/2.0/'
let url = 'http://example.com';

//let JSON = require('JSON');
let options = {
  json: true
}
let config = {
  whitespace: 1,
  page: 1,
  per_page: 10
}
let client_id = 'YEkMtWaFXg';
let secret = process.env.QUIZLET_SECRET;
module.exports = {};

exports.getSet = function (setId) {
  request(quizlet + `sets/${setId}?client_id=${client_id}&whitespace=
  ${config.whitespace}`, options, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      console.log(error);
    } else {
      //do alexa stuff here
    }
  })
}

exports.search = function (query) {
  request(quizlet + `search/sets?q=${query}&client_id=${client_id}
  &whitespace=${config.whitespace}&page=${config.page}
  &per_page=${config.per_page}`,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return body;
    } else {
      return error;
    }
  });
  return res;
}
exports.getSet(415);


