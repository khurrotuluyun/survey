const Hapi = require('@hapi/hapi');
const { connectToDatabase, closeDatabaseConnection, } = require('./db');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    // Menambahkan rute dari file routes.js
    server.route(routes);

    // Menyambung ke database sebelum server dimulai
    await connectToDatabase();

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('SIGINT', async () => {
    // Menutup koneksi database saat server dihentikan
    await closeDatabaseConnection();
    process.exit(0);
});

init();
