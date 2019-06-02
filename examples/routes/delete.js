/**
 * Server up an HTML document that sends a DELETE request to itself
 * @param {request} request
 * @return {string|object}
 */
exports.get =  () => {
  return `<html>
      <head>
        <script>
          /* DELETE */
          var httpRequest = new XMLHttpRequest()
          httpRequest.onload = () => { console.log('Check the network tab') }
          httpRequest.open('DELETE', '/delete')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send('action=Deleted&foo=bar&num=1234')
        </script>
      </head>
      <body>
        <h1>DELETE Responses</h1>
        <p>Check your network tab</p>
      </body>
    </html>`
}

/**
 * Responds to DELETE requests
 * @param {request} request
 * @return {string|object}
 */
exports.delete = request => ({message: 'I am a reponse from your DELETE API request', _headers: Object.keys(request.headers)})
