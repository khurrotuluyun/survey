const Hapi = require('@hapi/hapi');
const routes = require('./routes');

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

    // Running server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();