# hapi-rethinkdbdash

A Hapi plugin for the [rethinkdbdash driver by neumino](https://github.com/neumino/rethinkdbdash).

## Installation

Install the plugin, Hapi, and rethinkdbdash:

```
npm install --save hapi rethinkdbdash hapi-rethinkdbdash
```

## Registering the plugin

The options you pass to the plugin are passed **directly** to rethinkdbdash under the hood with no modifications or adulterations. [See rethinkdbdash documentation for more info](https://github.com/neumino/rethinkdbdash).

```javascript
const Hapi = require('hapi')
const server = new Hapi.Server()
const RethinkDBDash = require('hapi-rethinkdbdash')

/* Connect to the default instance on localhost at port 28015. */
server.register(RethinkDBDash, (err) => {
  if (err) throw err
  console.log('Time for some connection pooling RethinkDB awesomeness!')
})
```

**Note:** If you specify `options.db` then that will be the default database for the connection. Otherwise, you'll need to specify `r.db('my_database')` before you make any queries to a table.

## Using the plugin

The connection is exposed as `r` on the plugin so this is all you need to do to access it in a handler:

```javascript
server.route({
  method: 'GET',
  path: '/',

  /* Get all entries from the 'widgets' table */
  handler: (request, reply) => {
    const r = server.plugins['hapi-rethinkdbdash'].r

    r.table('widgets').run()
      .then(widgets => reply(widgets))
  }
})
```

## License

MIT
