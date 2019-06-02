/**
 * Server up an HTML document that sends a POST request to itself
 * @param {request} request
 * @return {string|object}
 */
exports.get =  () => {
  return `<html>
      <head>
        <script>
          /* POST */
          var httpRequest = new XMLHttpRequest()
          httpRequest.onload = () => { console.log('Check the network tab') }
          httpRequest.open('POST', '/post')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send('action=Posted&foo=bar&num=1234')
        </script>
      </head>
      <body>
        <h1>POST Responses</h1>
        <p>Check your network tab</p>
      </body>
    </html>`
}

/**
 * Responds to POST requests
 * @param {request} request
 * @return {string|object}
 */
exports.post = request => ({message: 'I am a reponse from your POST API request', _headers: Object.keys(request.headers)})
