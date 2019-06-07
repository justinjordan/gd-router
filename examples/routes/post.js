/**
 * Responds to POST requests
 * @param {request} request
 * @return {string|object}
 */
exports.post = request => ({message: 'I am a reponse from your POST API request', _get: Object.keys(request.params)})
