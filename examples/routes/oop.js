const { Controller } = require('../..')

class oop extends Controller
{
    /**
     * Handles GET requests
     * @param {request} request
     * @return {string|object}
     */
    get(request) {
        return "<h1>Hello!</h1><p>I am a url route created by an object oriented javascript file, weeee!</p>"
    }

    // post, put, and delete methods may also be used
}

module.exports = oop
