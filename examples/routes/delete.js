/**
 * Responds to DELETE requests
 * @param {request} request
 * @return {string|object}
 */
exports.delete = request => ({message: 'I am a reponse from your DELETE API request', _headers: Object.keys(request.headers)})
