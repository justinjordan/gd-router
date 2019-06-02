const { Server } = require('./../')

new Server().start(3001, `${__dirname}/routes/`)
