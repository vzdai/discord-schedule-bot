const Strings = require('../../values/strings');
const groupDB = require('../../database/services/group.service');

const sprintf = require("sprintf-js").sprintf;

const GroupService = function () {};

let nextInput;

/*
    group = {
        group_name,
        group_public,
        members, (user obj)
        server_id,
    }
 */
let group = {};

GroupService.prototype.continue = (message) => {
    if (nextInput) {
        console.log('running next input');
        Replies[nextInput](message);
    }
};

GroupService.prototype.createGroup = (message) => {
    message.reply(Strings.GROUP_ASK_NAME);
    nextInput = 'setName';
};


const Replies = {};

Replies.setName = (message) => {
    group.group_name = message.content;
    message.reply(Strings.GROUP_SET_NAME + message.content + '.\n' + Strings.GROUP_ASK_MEMBERS);
    nextInput = 'setMembers';
};

Replies.setMembers = (message) => {
    let memberNames = '';
    let users = [];
    message.mentions.users.forEach((value, key) => {
        memberNames += `${value.username}, `;
        const user = {
            user_id: value.id,
            user_name: value.username,
            user_discriminator: value.discriminator,
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

    group.group_public = status;
    message.reply(Strings.GROUP_SET_OPEN + status + '.\n' + Strings.GROUP_ASK_CONFIRM);
    nextInput = 'groupCreated';
};

Replies.groupCreated = (message) => {
    const confirm = message.content.toLowerCase() === 'yes';
    message.reply(sprintf(Strings.GROUP_CREATED, group.group_name));
    group.server_id = parseInt(message.guild.id);

    groupDB.addGroup(group);

    clearPendingGroup();
};


function clearPendingGroup() {
    group = {};
}



module.exports = new GroupService();