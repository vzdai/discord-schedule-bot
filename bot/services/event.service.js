const Strings = require('../../values/strings');
const Utils = require('../../utils/utils');
const groupDB = require('../../database/services/group.service');
const eventDB = require('../../database/services/event.service');
const sprintf = require('sprintf-js').sprintf;

const _ = require('lodash');

const EventService = function () {};

let nextInput;

/*
    event = {
        event_name,
        groups,
        members,
        event_start_time,
        event_end_time,
        server_id,
    }
 */

let event = {};

EventService.prototype.continue = (message) => {
    if (nextInput) {
        console.log('running next input');
        Replies[nextInput](message);
        return true;
    }
    return false;
};

EventService.prototype.createEvent = (message) => {
    message.reply(Strings.EVENT_ASK_NAME);
    nextInput = 'setName';
};

EventService.prototype.listEvents = (message) => {
    eventDB.getEvents(message.guild.id, (results) => {
        let names = results.map(result => result.event_name);
        message.reply(Strings.EVENT_LIST + Utils.createStringList(names) + '.');
    });
};

const Replies = {};

Replies.setName = (message) => {
    event.event_name = message.content;
    message.reply(Strings.EVENT_SET_NAME + message.content + '.\n' + Strings.EVENT_ASK_START_TIME);
    nextInput = 'setStartTime';
};

Replies.setStartTime = (message) => {
    // parse date
    event.startTime = Utils.parseDate(message.content);

    message.reply(Strings.EVENT_SET_START_TIME + message.content + '.\n' + Strings.EVENT_ASK_END_TIME);
    nextInput = 'setEndTime';
};

Replies.setEndTime = (message) => {
    // parse date
    event.endTime = Utils.parseDate(message.content);

    message.reply(Strings.EVENT_SET_END_TIME + message.content + '.\n' + Strings.EVENT_ASK_GROUP);
    nextInput = 'shouldSetGroups';
};

Replies.shouldSetGroups = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';

    if (confirm) {
        message.reply(Strings.EVENT_ASK_GROUP2);
        nextInput = 'setGroups';
    } else {
        message.reply(Strings.EVENT_ASK_MEMBERS2);
        nextInput = 'shouldSetMembers';
    }
};

Replies.setGroups = (message) => {
    const groups = message.content.split(',').map(groupname => groupname.trim());
    let promises = [];
    let users = [];

    groups.forEach((groupname) => {
        promises.push(new Promise((resolve) => {
            groupDB.findGroupByName(groupname, message.guild.id).then((result) => {
                groupDB.getUsersInGroup(result[0].group_id).then((usersInGroup) => {
                    users = _.union(users, usersInGroup.map(user => user.user_id));
                    resolve();
                });
            });
        }));
    });

    Promise.all(promises).then(() => {
        console.log('final users to add from groups', users);
        event.groupUsers = users;

        message.reply(Strings.EVENT_ASK_MEMBERS2);
        nextInput = 'shouldSetMembers';
    });
};

Replies.shouldSetMembers = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';

    if (confirm) {
        message.reply(Strings.EVENT_ASK_MEMBERS);
        nextInput = 'setMembers';
    } else {
        message.reply(Strings.EVENT_ASK_OPEN);
        nextInput = 'setOpenStatus';
    }
};

Replies.setMembers = (message) => {
    console.log('mentions', message.mentions.users);
    let memberNames = '';
    let users = [];
    message.mentions.users.forEach((value, key) => {
        console.log('user value', value);
        memberNames += `${value.username}, `;
        const user = {
            user_id: value.id,
            user_name: value.username,
            user_discriminator: value.discriminator,
        };
        users.push(user);
    });
    memberNames = memberNames.substr(0, memberNames.length - 2);

    event.members = users;
    message.reply(Strings.EVENT_ADDED_MEMBERS + memberNames + '.\n' + Strings.EVENT_ASK_OPEN);
    nextInput = 'setOpenStatus';
};

Replies.setOpenStatus = (message) => {
    const status = message.content.toLowerCase() === 'yes';

    event.event_public = status;
    message.reply(Strings.EVENT_SET_OPEN + status + '.\n' + Strings.EVENT_ASK_CONFIRM);
    nextInput = 'eventCreated';
};

Replies.eventCreated = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';
    message.reply(sprintf(Strings.EVENT_CREATED, event.event_name));
    event.server_id = message.guild.id;

    eventDB.addEvent(event);

    resetConversation();
};

function resetConversation() {
    console.log('conversation reset');
    nextInput = undefined;
    event = {};
}

module.exports = new EventService();


/*
 event_id
 event_name
 event_start_time
 event_end_time
 server_id
 */