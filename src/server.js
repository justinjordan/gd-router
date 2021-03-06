const fs = require('fs')
const http = require('http')
const Request = require('./request')
const Controller = require('./controller')
const ApiController = require('./api-controller')

class Server {
  constructor() {
    this.routes = {}
  }

  /**
   * Starts up server
   * @param {int}    port       Server port
   * @param {string} routesDir  Directory containing route controllers
   */
  async start(port = 3000, routesDir = process.cwd() + '/routes') {
    await this.addRoutes(routesDir)

    http.createServer(this.handleRequest.bind(this)).listen(port)
    
    console.log("G** D*** Router running on port " + port)
  }

  async handleRequest(req, res) {
    for (let routePath in this.routes) {
      let route = this.routes[routePath]
      let requestPath = req.url.split('?')[0]

      // route doesn't match
      if (requestPath !== routePath && requestPath !== routePath + '/') {
        continue
      }

      const method = req.method.toLowerCase()
      await route[method](req, res)

      return
    }

    res.writeHead(404, {'Content-Type': 'text/html'})
    res.write("Route not found")
    res.end()
  }

  addRoute(route, method, callback) {
    route = route.trim()

    if (!this.routes[route]) {
      this.routes[route] = {}
    }
    
    this.routes[route][method] = callback
  }

  /**
   * Scans routes directory for controllers
   * @param {string}      routeDir  Directory containing route controllers
   * @return {Promise}
   */
  addRoutes(routeDir) {
    return new Promise((resolve, reject) => {
      if (routeDir[0] !== '/') {
        routeDir = __basedir + '/' + routeDir
      }

      fs.readdir(routeDir, (err, files) => {
        if (err) {
          reject(err)
        }

        if (!(files instanceof Array)) {
          throw new Error("No routes found")
        }

        for (let file of files) {
          let nameParts = file.match(/([\s\S]+)\.js/)

          // not a js file
          if (!nameParts) {
            continue
          }

          let ctrl
          const route = nameParts[1]
          const RouteController = require(routeDir + '/' + route)
          if (typeof RouteController === 'function') {
            // Class routes
            ctrl = new RouteController()
            if (!(ctrl instanceof Controller)) {
              console.error("Route must export Controller instance")
              continue
            }
          } else {
            // Function routes
            ctrl = RouteController
          }

          for (let method of ['get','post','put','delete']) {
            this.addRoute('/' + route, method, async (req, res) => {
              try {
                let data = ''
                if (req.method === 'GET') {
                  data = await ctrl[method](new Request(req))
                } else {
                  let body = await (() => {
                    return new Promise((resolve, reject) => {
                      let body = ''

                      req.on('data', chunk => {
                        body += chunk;
                      })
              
                      req.on('end', () => {
                        resolve(body)
                      });
                    })
                  })() 

                  console.log(body)
                }

                if (typeof data === 'object') {
                  // RESTful Response
                  res.writeHead(200, {'Content-Type': 'application/json'})
                  res.write(JSON.stringify({
                    statusCode: 200,
                    data,
                  }))
                } else {
                  // Normal Response
                  res.writeHead(200, {'Content-Type': 'text/html'})
                  res.write(data)
                }
              } catch (err) {
                const statusCode = err.code||500

                if (typeof data === 'object') {
                  // RESTful Response
                  res.writeHead(statusCode, {'Content-Type': 'application/json'})
                  res.write(JSON.stringify({
                    statusCode: err.code,
                    error: err.message,
                  }))
                } else {
                  // Normal Response
                  res.writeHead(statusCode, {'Content-Type': 'text/html'})
                  res.write(`Error: ` + err.message)
                }
              } finally {
                res.end()
              }
            })
          }
        }

        resolve()
      })
    })
  }
}

module.exports = Server