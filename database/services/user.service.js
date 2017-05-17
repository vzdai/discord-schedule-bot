const db = require('../connect');

const UserService = function () {};

/*
    users: [
        {
            user_id,
            user_name,
            user_discriminator,
        }
    ]
 */
UserService.prototype.addUsers = (users) => {
    if (!users) {
        console.log('Missing fields when adding users');
        return;
    }

    const rows = [];

    users.forEach((user) => {
        const row = [user.user_id, user.user_name, user.user_discriminator];
        rows.push(row);
    });

    console.log('created rows', rows);

    db.query('INSERT IGNORE INTO users (user_id, user_name, user_discriminator) VALUES ?', [rows],
        (error, results, fields) => {
            if (error) {
                console.error('Error adding users', error);
            }

            console.log('Results adding user', results);
            console.log('Fields adding user', fields);
        }
    )

};



const testUsers = [
    {
        user_id: 1,
        user_name: 'user 1',
        user_discriminator: 1,
    },

    {
        user_id: 2,
        user_name: 'user 2',
        user_discriminator: 2,
    },

];

UserService.prototype.addUsers(testUsers);


module.exports = new UserService();