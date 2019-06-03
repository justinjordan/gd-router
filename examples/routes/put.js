/**
 * Responds to PUT requests with a JSON object
 * @param {request} request
 * @return {string|object}
 */
exports.put = request => ({message: 'I am a reponse from your PUT API request', _headers: Object.keys(request.headers)})
