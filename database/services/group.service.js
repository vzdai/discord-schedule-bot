const db = require('../connect');
const userDB = require('./user.service');

const GroupService = function () {};

GroupService.prototype.addGroup = (group) => {
    if (!group || !group.group_name || !group.members || !group.group_public || !group.server_id) {
        console.log('Missing fields when adding group');
        return;
    }

    // const row = [group.group_name, group.group_public, group.server_id];

    const row = {
        group_name: group.group_name,
        group_public: group.group_public,
        server_id: group.server_id,
    };

    console.log('Row to insert', row);

    db.query('INSERT INTO groups SET ?', row, (error, results, fields) => {
        if (error) {
            console.error('Error adding group', error);
        }

        console.log('Results adding group', results);
        console.log('Fields adding group', fields);

        userDB.addUsers(group.members);

        // const values = [];
        // group.members.forEach((member) => {
        //     const user = [member.user_id, member.user_name, member.user_discriminator];
        //     values.push(user);
        // })


    });
};

module.exports = new GroupService();

// 'INSERT INTO groups (group_name, group_public, server_id) VALUES ?'