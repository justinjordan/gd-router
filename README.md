# G** D*** Router

There's no reason we should have to define routes manually for every single project. Like what the heck? Just give me a
G** D*** Router and let me get on with my life! So here is a router that lets you define controllers in the file system.
You just add your routes to a directory of your choosing. It's not that hard people!


## Install

**NPM:**

```
npm install --save gd-router
```

**Yarn:**

```
yarn add gd-router
```


## Usage

```
// server.js

const { Server } = require('gd-router')

/**
 * Starts G** D*** Server
 * @param {int}     port        [optional] Port number (Default: 3000)
 * @param {string}  routesDir   [optional] Routes directory (Default: './routes')
 */
new Server().start()
```

```
// routes/hello.js

const { Controller } = require('gd-router')

class HelloController extends Controller
{
    /**
     * Handles GET requests
     * @param {Hapi/Request} request
     * @return {string}
     */
    get(request) {
        return "Hello, world!"
    }

    // post, put, and delete methods may also be used
}

module.exports = HelloController
```

You now have a route at http://localhost:3000/hello and you didn't type until your fingers were raw!