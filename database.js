const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Arshi",
    database: "postgres"
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(error => console.error('Error connecting to the database:', error.message));

module.exports = {
    client
};
