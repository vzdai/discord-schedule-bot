const db = require('../connect');
const userDB = require('./user.service');

const _ = require('lodash');

const EventService = function () {};

EventService.prototype.addEvent = (event) => {
    const row = {
        event_name: event.event_name,
        event_start_time: event.startTime,
        event_end_time: event.endTime,
        event_public: event.event_public,
        server_id: event.server_id,
    };

    console.log('Row to insert', row);

    db.query('INSERT INTO events SET ?', row, (error, results, fields) => {
        if (error) {
            console.error('Error adding event', error);
        }

        console.log('Results adding event', results);
        console.log('Fields adding event', fields);

        userDB.addUsers(event.members);

        let membersToAdd = event.groupUsers || [];
        if (event.members) {
            membersToAdd = _.union(membersToAdd, event.members.map(user => user.user_id));
        }
        if (!_.isEmpty(membersToAdd)) {
            userDB.addUsersToEvent(membersToAdd, results.insertId);
        }
    });
};


EventService.prototype.getEvents = (serverID, callback) => {
    if (!serverID) {
        console.log('Missing serverID in getEvents');
        return;
    }

    console.log('using serverID', serverID);

    db.query('SELECT * FROM events WHERE server_id = ?', [serverID], (error, results, fields) => {
        if (error) {
            console.error('Error getting events', error);
        }

        console.log('Results getting events', results);
        console.log('Fields getting events', fields);

        if (callback) callback(results);
    });
};

EventService.prototype.findEventsByUser = (userID) => {
    return new Promise((resolve, reject) => {
        if (!userID) {
            console.log('Missing groupID in findEventByUser');
            reject();
        }

        db.query('SELECT * FROM event_users WHERE user_id = ?', [userID], (error, results, fields) => {
            if (error) {
                console.error('Error getting events', error);
                reject(error);
            }

            console.log('Results getting events', results);
            console.log('Fields getting events', fields);

            resolve(results);
        });
    });
};

EventService.prototype.findEventByName = (eventName, serverID) => {
    return new Promise((resolve, reject) => {
        if (!eventName || !serverID) {
            console.log('Missing event name or serverID when finding event');
            reject();
        }

        console.log('serverId', serverID);

        db.query('SELECT * FROM events WHERE event_name = ? AND server_id = ?', [eventName, serverID],
            (error, results, fields) => {
                if (error) {
                    console.error('Error getting events', error);
                    reject();
                }

                console.log('Results getting events', results);
                console.log('Fields getting events', fields);

                resolve(results);
            });
    });
};

EventService.prototype.getEventInfo = (eventID) => {
    return new Promise((resolve, reject) => {
        if (!eventID) {
            console.log('Missing groupID when finding group');
            reject();
        }

        db.query('SELECT * FROM events WHERE event_id = ?', [eventID], (error, results, fields) => {
            if (error) {
                console.error('Error getting events', error);
                reject();
            }

            console.log('Results getting events', results);
            console.log('Fields getting events', fields);

            resolve(results);
        });
    });
};


module.exports = new EventService();