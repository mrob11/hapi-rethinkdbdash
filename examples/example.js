const Hapi = require('hapi')
const server = new Hapi.Server()
const RethinkDBDash = {
  register: require('../'),
  options: {
    db: 'test'
  }
}

server.connection({ port: 3000 })
server.register(RethinkDBDash, (err) => {
  if (err) throw err
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      server.plugins['hapi-rethinkdbdash'].r.table('widgets').run()
        .then(widgets => reply(widgets))
        .catch(err => {
          throw err
        })
    }
  })

  server.route({
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
      server.plugins['hapi-rethinkdbdash'].r.table('widgets').insert(request.payload).run()
        .then(result => reply(result))
        .catch(err => {
           throw err
        })
    }
  })
  server.start()
})

