const url = require('url')

class Request
{
  /**
   * Parses client request
   *
   * Parses http.ClientRequest object and converts it into a standard consumable format.
   *
   * @param {http.ClientRequest} httpRequest 
   */
  constructor(httpRequest, params) {
    const urlParts = url.parse(httpRequest.url)

    this.params = params || {}

    // Add GET params
    if (httpRequest.method === 'GET') {
      if (urlParts.query) {
        for (let param of urlParts.query.split('&')) {
          if (!param) {
            continue
          }

          const [key, value] = param.split('=')
          this.params[key] = value
        }
      }
    }
  }
}

module.exports = Request