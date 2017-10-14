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
        let term = [];
        let definition = []
        if (!error && response.statusCode == 200) {
        	for(let i = 0; i < body.terms.length; i++){
        		term.push(body.terms[i].term)
        		definition.push(body.terms[i].definition)
            }
        }
        console.log(definition)
      })
}

// function search(query) {
//     request(quizlet + `sets/${setId}?client_id=${client_id}&whitespace=1`, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           console.log(body)
//         }
//       })
// }
getSet(415)
