const HttpError = require('./http-error')

class Controller
{
  get(request) {
    throw new HttpError("Method not allowed", 405)
  }
   
  post(request) {
    throw new HttpError("Method not allowed", 405)
  }
   
  put(request) {
    throw new HttpError("Method not allowed", 405)
  }
   
  delete(request) {
    throw new HttpError("Method not allowed", 405)
  }
}

module.exports = Controller