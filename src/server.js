const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const db = require('./db');


const init = async () => {

    // Initializing HTTP Server
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);
    server.decorate('request', 'knex', db);

    // Running server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();