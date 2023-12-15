// server.js
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const db = require('./db'); // Import the database connection

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  try {
    // Change from db.query to db.execute
    await db.execute('SELECT 1');

    // Attach the database connection to the server
    server.app.db = db;

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
