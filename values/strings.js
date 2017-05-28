module.exports = {
    // error handling
    INVALID_COMMAND: 'Sorry, I could not understand your command. Type \'help\' to see all available commands',
    HELP: 'Help: list of commands goes here',

    // set channel
    SET_CHANNEL: 'Please set a channel for me to listen to with the command \'setchannel CHANNEL_NAME\'. It is recommended that you create a new channel just for talking to me, so that I don\'t accidentally respond to keywords in regular conversation.',
    CHANGE_CHANNEL: 'I am set to respond in channel %s. If you wish to change my channel setting, use the command \'setchannel CHANNEL_NAME\'.',
    CHANNEL_CHANGED: 'I will now respond only in the channel \'%s\'.',


    // create group
    GROUP_ASK_NAME: 'What is the name of the group?',
    GROUP_ASK_MEMBERS: 'Who do you want to invite to the group? Please @mention each person you would like to invite.',
    GROUP_ASK_OPEN: 'Is the group open to self-invites? (yes/no)',
    GROUP_ASK_CONFIRM: 'Confirm creation of this group? (yes/no)',

    GROUP_SET_NAME: 'Set group name to ',
    GROUP_SET_MEMBERS: 'Set group members to ',
    GROUP_SET_OPEN: 'Set group open status to ',

    GROUP_CREATED: 'Group %s has been successfully created.',
    GROUP_CANCELLED: 'Cancelled creation of the group.',

    // list groups
    GROUP_LIST: 'Here is a list of all groups on this server: ',
    GROUP_LIST_JOINED: 'Here are the groups that you have joined: ',

    // join group
    GROUP_CHOOSE_JOIN: 'What is the name of the group you want to join?',
    GROUP_NOT_FOUND: 'Sorry, I could not find a group named %s.',
    GROUP_NOT_OPEN: 'The group you specified is not open to self-invites.',
    GROUP_JOINED: 'You have joined the group ',
    GROUP_JOIN_ERROR: 'An error occurred when adding you to the group.',


    // create event

    EVENT_ASK_NAME: 'What is the name of the event?',
    EVENT_ASK_START_TIME: 'When does the event start?',
    EVENT_ASK_END_TIME: 'When does the event end?',
    EVENT_ASK_GROUP: 'Do you want to invite groups to the event? (yes/no)',
    EVENT_ASK_GROUP2: 'Please enter the names of the groups you want to invite, separated by commas.',
    EVENT_ASK_MEMBERS: 'Which members do you want to invite to the event? Please @mention each person.',
    EVENT_ASK_MEMBERS2: 'Do you want to invite other members to the event who aren\'t in the group? (yes/no)',
    EVENT_ASK_OPEN: 'Is the event open to self-invites? (yes/no)',
    EVENT_ASK_CONFIRM: 'Confirm creation of this event? (yes/no)',

    EVENT_SET_NAME: 'Set event name to ',
    EVENT_SET_START_TIME: 'Set event start time to ',
    EVENT_SET_END_TIME: 'Set event end time to ',
    EVENT_SET_MEMBERS: 'Members/groups invited to this event: ',
    EVENT_SET_OPEN: 'Set event open status to ',

    EVENT_CREATED: 'Event %s has been successfully created.',
};
