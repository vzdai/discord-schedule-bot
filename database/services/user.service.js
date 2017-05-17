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


};


module.exports = new UserService();