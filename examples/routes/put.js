/**
 * Server up an HTML document that sends a PUT request to itself
 * @param {request} request
 * @return {string|object}
 */
exports.get =  () => {
  return `<html>
      <head>
        <script>
          /* PUT */
          var httpRequest = new XMLHttpRequest()
          httpRequest.onload = () => { console.log('Check the network tab') }
          httpRequest.open('PUT', '/put')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send('action=Puted&foo=bar&num=1234')
        </script>
      </head>
      <body>
        <h1>PUT Responses</h1>
        <p>Check your network tab</p>
      </body>
    </html>`
}

/**
 * Responds to PUT requests
 * @param {request} request
 * @return {string|object}
 */
exports.put = request => ({message: 'I am a reponse from your PUT API request', _headers: Object.keys(request.headers)})
