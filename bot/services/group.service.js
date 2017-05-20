const Strings = require('../../values/strings');
const groupDB = require('../../database/services/group.service');
const userDB = require('../../database/services/user.service');

const sprintf = require("sprintf-js").sprintf;
const _ = require('lodash');

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

GroupService.prototype.continue = (message, conversationType) => {
    if (nextInput) {
        console.log('running next input');
        Replies[nextInput](message);
    }
    return nextInput ? true : false;
};

GroupService.prototype.createGroup = (message) => {
    message.reply(Strings.GROUP_ASK_NAME);
    nextInput = 'setName';
};

GroupService.prototype.listGroups = (message) => {
    groupDB.getGroups(message.guild.id, (results) => {
        let groupNames = '';

        results.forEach((result) => {
            groupNames += result.group_name;
            groupNames += ', ';
        });

        groupNames = groupNames.substr(0, groupNames.length - 2);
        message.reply(Strings.GROUP_LIST + groupNames + '.');
    });
};

GroupService.prototype.joinGroup = (message) => {
    message.reply(Strings.GROUP_CHOOSE_JOIN);
    nextInput = 'groupJoined';
};

// Replies for chain group messages

const Replies = {};

Replies.setName = (message) => {
    group.group_name = message.content;
    message.reply(Strings.GROUP_SET_NAME + message.content + '.\n' + Strings.GROUP_ASK_MEMBERS);
    nextInput = 'setMembers';
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
    if (confirm) {
        message.reply(sprintf(Strings.GROUP_CREATED, group.group_name));
        group.server_id = message.guild.id;
        groupDB.addGroup(group);
    } else {
        message.reply(Strings.GROUP_CANCELLED);
    }

    resetConversation();
};

Replies.groupJoined = (message) => {
    const groupName = message.content;
    const serverID = message.guild.id;

    groupDB.findGroupByName(groupName, serverID, (result) => {
        if (_.isEmpty(result)) {
            message.reply(sprintf(Strings.GROUP_NOT_FOUND, groupName));
            resetConversation();
        } else if (!result[0].group_public) {
            message.reply(Strings.GROUP_NOT_OPEN);
            resetConversation();
        } else {
            const user = {
                user_id: message.author.id,
                user_name: message.author.username,
                user_discriminator: message.author.discriminator,
            };

            userDB.addUsersToGroup([user], result[0].group_id, (result) => {
                if (_.isEmpty(result)) {
                    message.reply(Strings.GROUP_JOIN_ERROR);
                } else {
                    message.require(Strings.GROUP_JOINED);
                }
                resetConversation();
            });
        }
    });
};

function resetConversation() {
    nextInput = undefined;
    group = {};
}



module.exports = new GroupService();