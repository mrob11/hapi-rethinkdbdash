'use strict'

const rethinkdb = require('rethinkdbdash')

exports.register = (server, options, next) => {
  const r = rethinkdb(options)
  server.expose('r', r)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
