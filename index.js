let client_id = 'YEkMtWaFXg';
let secret = process.env.QUIZLET_SECRET;
let quizlet = 'https://api.quizlet.com/2.0/'
let url = 'https://google.com';
let request = require('request');


// request(quizlet + `sets/415?client_id=${client_id}&whitespace=1`, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body)
//     }
//   })

  request.delete(quizlet + `sets/233884698?client_id=${client_id}&whitespace=1`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    } else {
        console.log(response.statusCode);
        console.log(error);
    }
  })