/**
 * Handles GET requests
 * @param {request} request
 * @return {string|object}
 */
exports.get =  request => {
  return `<html>
      <head>
        <script>
          /* Function to append responses to list item */
          function showResponse(data) {
            const response = (data.currentTarget || {}).response || false
            if (response) {
              const parsedResponse = JSON.parse(response).data
              const newText = document.createTextNode(parsedResponse.message)
              const newElement = document.createElement('li')
              newElement.appendChild(newText)
              document.getElementById('output').appendChild(newElement)
            }
          }

          /* PUT */
          var httpRequest = new XMLHttpRequest()
          httpRequest.onload = showResponse
          httpRequest.open('PUT', '/get-put-post-delete')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send()

          /* POST */
          httpRequest = new XMLHttpRequest()
          httpRequest.onload = showResponse
          httpRequest.open('POST', '/get-put-post-delete')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send()

          /* DELETE */
          httpRequest = new XMLHttpRequest()
          httpRequest.onload = showResponse
          httpRequest.open('DELETE', '/get-put-post-delete')
          httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          httpRequest.send()
        </script>
      </head>
      <body>
        <h1>API Responses:</h1>
        <ul id="output" />
      </body>
    </html>`
}

exports.post = request => ({message: 'I am a reponse from your POST API request', _request: Object.keys(request)})
exports.put = request => ({message: 'I am a reponse from your PUT API request', _request: Object.keys(request)})
exports.delete = request => ({message: 'I am a reponse from your DELETE API request', _request: Object.keys(request)})
