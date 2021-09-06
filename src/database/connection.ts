import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Jpt@030114',
        database: 'training_nodejs'
    },
    useNullAsDefault: true
});

export default connection;