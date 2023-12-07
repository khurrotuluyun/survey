const Knex = require('knex');

const knex = Knex({
    client: 'mysql2',
    connection: {
        host: 'public_ip_sql_instance_Anda',
        user: 'root',
        database: 'nama_database_Anda',
        password: 'password_sql_Anda',
    },
});

module.exports = knex;
