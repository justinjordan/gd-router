/**
 * Responds to PUT requests with a JSON object
 * @param {request} request
 * @return {string|object}
 */
exports.put = request => ({message: 'I am a reponse from your PUT API request', _headers: Object.keys(request.headers)})

/**
 * Responds to POST requests
 * @param {request} request
 * @return {string|object}
 */
exports.post = request => ({message: 'I am a reponse from your POST API request', _headers: Object.keys(request.headers)})

/**
 * Responds to DELETE requests
 * @param {request} request
 * @return {string|object}
 */
exports.delete = request => ({message: 'I am a reponse from your DELETE API request', _headers: Object.keys(request.headers)})
