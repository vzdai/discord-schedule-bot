const groupService = require('./group.service');
const eventService = require('./event.service');

const MessageHandler = function() {};

let conversationType;

MessageHandler.prototype.handleMessage = (message) => {
    if (conversationType === 'group') {
        groupService.continue(message);
    } else if (conversationType === 'event') {
        eventService.continue(message);
    } else {
        parseMessage(message);
    }
};

MessageHandler.prototype.resetConversation = () => {
    conversationType = undefined;
};

function parseMessage(message) {
    const str = message.content;
    const words = str.split(' ');
    const command = words[0];
    const remainingString = words.slice(2, words.length).join(' ');
    // const remainingString = str.substring(str.indexOf(' ') + 1, str.length);

    switch (command) {
        case 'create':
            if (words[1] === 'group') {
                groupService.createGroup(message);
                conversationType = 'group';
            } else if (words[1] === 'event') {

            } else {

            }
            break;
        case 'join':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {

            }
            break;
        case 'list':
            if (words[1] === 'groups') {

            } else if (words[1] === 'events') {

            } else {

            }
            break;
        case 'edit':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {

            }
            break;
        case 'leave':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {

            }
            break;
        case 'delete':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {

            }
            break;
    }
}

module.exports = new MessageHandler();