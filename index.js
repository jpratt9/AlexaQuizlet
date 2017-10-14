let quizlet = 'https://api.quizlet.com/2.0/'
let url = 'http://example.com';
let request = require('request');
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
    request(quizlet + `sets/415?client_id=${client_id}&whitespace=
    ${config.whitespace}`, options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body.terms[1])
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
        console.log(definition)
      })
}
//getSet(415);

