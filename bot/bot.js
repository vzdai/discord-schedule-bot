const channelService = require('./services/channel.service');
const Strings = require('../values/strings');

const sprintf = require("sprintf-js").sprintf;

module.exports = (bot) => {
    bot.on('ready', () => {
        console.log('Bot is online!');
    });

    bot.on('message', message => {
        if (message.author.id === process.env.CLIENT_ID) {
            console.log('I sent a message');
            return;
        }

        const channel = channelService.getChannel();

        // bot is mentioned in different channel or channel not set
        if (message.channel.name !== channel &&
            message.mentions.users.has(process.env.CLIENT_ID)) {
            const command = 'setchannel';

            // setchannel command
            if (message.content.includes(command)) {
                const channelName = message.content.slice(
                    message.content.indexOf(command) + command.length + 1
                );
                channelService.setChannel(channelName, message);
            } else if (!channel) {
                message.reply(Strings.SET_CHANNEL);
            } else {
                message.reply(sprintf(Strings.CHANGE_CHANNEL, channel));
            }
            return;
        }

        if (message.channel.name === channel) {
            message.reply('This is the proper channel!');
            return;
        }


        //
        // if (message.mentions.users.has(process.env.CLIENT_ID)) {
        //     message.reply('I was mentioned!');
        //     return;
        // }
        //
        // if (message.content === 'ping') {
        //     message.reply('pong');
        // }
    });

    bot.login(process.env.BOT_TOKEN);
};

