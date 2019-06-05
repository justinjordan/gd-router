/**
 * Handles GET requests
 * @param {request} request
 * @return {string|object}
 */
exports.get = request => ({
  boolean: true,
  string: "example",
  _request: Object.keys(request),
})
