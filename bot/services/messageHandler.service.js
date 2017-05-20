const groupService = require('./group.service');
const eventService = require('./event.service');

const Strings = require('../../values/strings');

const MessageHandler = function() {};

let conversationType;

MessageHandler.prototype.handleMessage = (message) => {
    let continued = false;
    if (conversationType === 'group') {
        continued = groupService.continue(message);
    } else if (conversationType === 'event') {
        continued = eventService.continue(message, conversationType);
    }
    if (!continued) {
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
                eventService.createEvent(message);
                conversationType = 'event';
            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'join':
            if (words[1] === 'group') {
                groupService.joinGroup(message);
                conversationType = 'group';
            } else if (words[1] === 'event') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'list':
            if (words[1] === 'groups') {
                groupService.listGroups(message);
            } else if (words[1] === 'events') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'edit':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'leave':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'delete':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'info':
            if (words[1] === 'group') {

            } else if (words[1] === 'event') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'my':
            if (words[1] === 'groups') {

            } else if (words[1] === 'events') {

            } else {
                handleInvalidCommand(message);
            }
            break;
        case 'help':
            sendHelpMessage(message);
            break;
        default:
            handleInvalidCommand(message);
    }
}

function handleInvalidCommand(message) {
    message.reply(Strings.INVALID_COMMAND);
}

function sendHelpMessage(message) {
    message.reply(Strings.HELP);
}

module.exports = new MessageHandler();