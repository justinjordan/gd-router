class HttpError
{
  constructor(message = 'Request error', code = 500) {
    this.message = message
    this.code = code
  }
}

module.exports = HttpError