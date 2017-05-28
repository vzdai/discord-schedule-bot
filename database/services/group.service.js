const db = require('../connect');
const userDB = require('./user.service');

const GroupService = function () {};

GroupService.prototype.addGroup = (group) => {
    if (!group || !group.group_name || !group.members || !group.hasOwnProperty('group_public')|| !group.server_id) {
        console.log('Missing fields when adding group', group);
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
        userDB.addUsersToGroup(group.members, results.insertId);
    });
};

GroupService.prototype.getGroups = (serverID, callback) => {
    if (!serverID) {
        console.log('Missing serverID in getGroups');
        return;
    }

    console.log('using serverID', serverID);

    db.query('SELECT * FROM groups WHERE server_id = ?', [serverID], (error, results, fields) => {
        if (error) {
            console.error('Error getting groups', error);
        }

        console.log('Results getting groups', results);
        console.log('Fields getting groups', fields);

        callback(results);
    });
};

GroupService.prototype.findGroupsByUser = (userID) => {
    return new Promise((resolve, reject) => {
        if (!userID) {
            console.log('Missing groupID in getGroups');
            reject();
        }

        db.query('SELECT * FROM group_users WHERE user_id = ?', [userID], (error, results, fields) => {
            if (error) {
                console.error('Error getting groups', error);
                reject(error);
            }

            console.log('Results getting groups', results);
            console.log('Fields getting groups', fields);

            resolve(results);
        });
    });
};

GroupService.prototype.findGroupByName = (groupName, serverID, callback) => {
    if (!groupName || !serverID) {
        console.log('Missing group name or serverID when finding group');
        return;
    }

    console.log('serverId', serverID);

    db.query('SELECT * FROM groups WHERE group_name = ? AND server_id = ?', [groupName, serverID],
        (error, results, fields) => {
            if (error) {
                console.error('Error getting groups', error);
            }

            console.log('Results getting groups', results);
            console.log('Fields getting groups', fields);

            callback(results);
        });
};

GroupService.prototype.getGroupInfo = (groupID) => {
    return new Promise((resolve, reject) => {
        if (!groupID) {
            console.log('Missing groupID when finding group');
            reject();
        }

        db.query('SELECT * FROM groups WHERE group_id = ?', [groupID], (error, results, fields) => {
            if (error) {
                console.error('Error getting groups', error);
                reject();
            }

            console.log('Results getting groups', results);
            console.log('Fields getting groups', fields);

            resolve(results);
        });
    });
};

module.exports = new GroupService();
