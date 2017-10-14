let client_id = 'YEkMtWaFXg';
let secret = process.env.QUIZLET_SECRET;
let quizlet = 'https://api.quizlet.com/2.0/'
let url = 'http://example.com';
let request = require('request');
let options = {
    json: true
}



function getSet(setId) {
    request(quizlet + `sets/415?client_id=${client_id}&whitespace=1`, options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body.terms[1])
        }
    })
}

function search(query) {
    request(quizlet + `sets?q=${query}&client_id=${client_id}&whitespace=1`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        } else {
            console.log(error)
        }
    })
}
search('french');
//getSet(415);

