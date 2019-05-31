const fs = require('fs')
const Hapi = require('@hapi/hapi')
const Controller = require('./controller')
const ApiController = require('./api-controller')

class Server {
  /**
   * Starts up server
   * @param {int}    port       Server port
   * @param {string} routesDir  Directory containing route controllers
   */
  async start(port, routesDir) {
    process.on('unhandledRejection', err => {
      console.log(err)
      process.exit()
    })

    const server = Hapi.server({
      port: port,
      host: 'localhost',
    })
    
    await this.addRoutes(server, routesDir)
    await server.start()

    console.log("G** D*** Router running on port " + port)
  }

  /**
   * Scans routes directory for controllers
   * @param {Hapi.server} server    Hapi.js server instance
   * @param {string}      routeDir  Directory containing route controllers
   * @return Promise
   */
  addRoutes(server, routeDir) {
    return new Promise((resolve, reject) => {
      if (routeDir[0] !== '/') {
        routeDir = __basedir + '/' + routeDir
      }

      fs.readdir(routeDir, (err, files) => {
        if (err) {
          reject(err)
        }

        for (let file of files) {
          let nameParts = file.match(/([\s\S]+)\.js/)

          // not a js file
          if (!nameParts) {
            continue
          }

          const route = nameParts[1]
          const RouteController = require(routeDir + '/' + route)
          const ctrl = new RouteController()

          if (!(ctrl instanceof Controller)) {
            console.error("Route must export Controller instance")
            continue
          }

          for (let method of ['get','post','put','delete']) {
            // add route
            server.route({
              method: method.toUpperCase(),
              path: '/' + route,
              async handler(request, h) {
                if (ctrl instanceof ApiController) {
                  try {
                    const data = await ctrl[method](request)

                    return h
                      .response({
                        data,
                      })
                      .type('application/json')
                  } catch (err) {
                    return h
                      .response({
                        error: err.message,
                        status: err.code,
                      })
                      .type('application/json')
                      .code(err.code)
                  }
                } else {
                  try {
                    const data = await ctrl[method](request)
                    return h.response(data)
                  } catch (err) {
                    return h
                      .response(err.message)
                      .code(err.code)
                  }
                }
              },
            })
          }
        }

        resolve()
      })
    })
  }
}

module.exports = Server