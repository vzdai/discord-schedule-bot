const Strings = require('../../values/strings');

const sprintf = require("sprintf-js").sprintf;

const GroupService = function () {};

let nextInput;

let group = {};

GroupService.prototype.continue = (message) => {
    if (nextInput) {
        console.log('running next input');
        // return GroupService.prototype[nextInput](message);
        Replies[nextInput](message);
    }
};

GroupService.prototype.createGroup = (message) => {
    message.reply(Strings.GROUP_ASK_NAME);
    nextInput = 'setName';
};


const Replies = {};

Replies.setName = (message) => {
    group.name = message;
    message.reply(Strings.GROUP_SET_NAME + message + '.\n' + Strings.GROUP_ASK_MEMBERS);
    nextInput = 'setMembers';
};

Replies.setMembers = (message) => {
    let memberNames = '';
    let users = [];
    message.mentions.users.forEach((value, key) => {
        memberNames += `${value.username}, `;
        const user = {
            id: value.id,
            username: value.username,
            discriminator: value.discriminator,
        };
        users.push(user);
    });
    memberNames = memberNames.substr(0, memberNames.length - 2);

    group.members = users;
    message.reply(Strings.GROUP_SET_MEMBERS + memberNames + '.\n' + Strings.GROUP_ASK_OPEN);
    nextInput = 'setOpenStatus';
};

Replies.setOpenStatus = (message) => {
    const status = message.content.toLowerCase() === 'yes';

    group.open = status;
    message.reply(Strings.GROUP_SET_OPEN + status + '.\n' + Strings.GROUP_ASK_CONFIRM);
    nextInput = 'groupCreated';
};

Replies.groupCreated = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';
    message.reply(sprintf(Strings.GROUP_CREATED, group.name));

    // add to db

    clearPendingGroup()
};


function clearPendingGroup() {
    group = {};
}



module.exports = new GroupService();