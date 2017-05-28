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
UserService.prototype.getUserInfo = (userID) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE user_id = ?', [userID], (error, results, fields) => {
            if (error) {
                console.error('Error getting user info', error);
                reject();
            }

            console.log('Results getting user info', results);
            console.log('Fields getting user info', fields);
            resolve(results);
        })
    });
};


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

UserService.prototype.addUsersToGroup = (users, groupID, callback) => {
    const rows = [];

    users.forEach((user) => {
        const row = [groupID, user.user_id];
        rows.push(row);
    });

    db.query('INSERT IGNORE INTO group_users (group_id, user_id) VALUES ?', [rows],
        (error, results, fields) => {
            if (error) {
                console.error('Error adding group users', error);
                return {};
            }

            console.log('Results adding group_user', results);
            console.log('Fields adding group_user', fields);
            callback(results);
        }
    )
};

UserService.prototype.removeUserFromGroup = (userID, groupID, callback) => {
    // const rows = [];
    //
    // users.forEach((user) => {
    //     const row = [groupID, user.user_id];
    //     rows.push(row);
    // });

    db.query('DELETE FROM group_users WHERE group_id = ? AND user_id = ?', [groupID, userID],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting group users', error);
                return {};
            }

            console.log('Results deleting group_user', results);
            console.log('Fields deleting group_user', fields);
            callback(results);
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

// UserService.prototype.addUsers(testUsers);


module.exports = new UserService();