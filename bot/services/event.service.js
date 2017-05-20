const Strings = require('../../values/strings');

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
    }
    return nextInput ? true : false;
};

EventService.prototype.createEvent = (message) => {
    message.reply(Strings.EVENT_ASK_NAME);
    nextInput = 'setName';
};

const Replies = {};

Replies.setName = (message) => {
    event.event_name = message.content;
    message.reply(Strings.EVENT_SET_NAME + message.content + '.\n' + Strings.EVENT_ASK_START_TIME);
    nextInput = 'setStartTime';
};

Replies.setStartTime = (message) => {
    // parse date

    message.reply(Strings.EVENT_SET_START_TIME + message.content + '.\n' + Strings.EVENT_ASK_END_TIME);
    nextInput = 'setEndTime';
};

Replies.setEndTime = (message) => {
    // parse date
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
    let memberNames = '';
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

Replies.setOpenStatus = (message) => {
    const status = message.content.toLowerCase() === 'yes';

    event.event_public = status;
    message.reply(Strings.EVENT_SET_OPEN + status + '.\n' + Strings.EVENT_ASK_CONFIRM);
    nextInput = 'eventCreated';
};

Replies.eventCreated = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';
    message.reply(sprintf(Strings.EVENT_CREATED, event.event_name));
    event.server_id = parseInt(message.guild.id);

    eventDB.addEvent(event);

    clearPendingEvent();
};

function clearPendingEvent() {
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