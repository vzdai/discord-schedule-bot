// to start database service:
// - open command prompt as administrator
// - net start mysql57

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: 'discord_bot',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;

    if (rows[0].solution === 2)
        console.log('Database connection successful.')
});

module.exports = connection;


/*

DB structure:

// Servers
//     server_id
//     server_name

Users
    user_id
    user_name
    user_discriminator

// server_users
//     user_id
//     server_id

Groups
    group_id
    group_name
    group_public
    server_id

group_users
    group_id
    user_id

events
    event_id
    event_name
    event_start_time
    event_end_time
    server_id

event_participants
    event_id
    user_id


 */
