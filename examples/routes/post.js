/**
 * Responds to POST requests
 * @param {request} request
 * @return {string|object}
 */
exports.post = request => ({message: 'I am a reponse from your POST API request', _headers: Object.keys(request.headers)})
