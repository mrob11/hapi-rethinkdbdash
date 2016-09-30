'use strict'

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { beforeEach, describe, it } = lab
const { expect } = Lab.assertions
const Hapi = require('hapi')
const RethinkDBDash = require('../')

describe('RethinkDBDash Plugin', () => {
  let server = null

  beforeEach((done) => {
    server = new Hapi.Server()
    done()
  })

  it('should register the plugin with default / no options', (done) => {
    server.register(RethinkDBDash, (err) => {
      expect(err).to.not.exist()
      done()
    })
  })

  it('should expose the connection as r', (done) => {
    server.register(RethinkDBDash, () => {
      expect(server.plugins['hapi-rethinkdbdash'].r).to.be.a.function()
      done()
    })
  })

})
