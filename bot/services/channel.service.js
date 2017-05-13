const Strings = require('../../values/strings');

const sprintf = require("sprintf-js").sprintf;

const ChannelService = function() {};

let channel = 'bot';

ChannelService.prototype.setChannel = (channelName, message) => {
    channel = channelName;
    message.reply(sprintf(Strings.CHANNEL_CHANGED, channelName))
};

ChannelService.prototype.getChannel = () => {
  return channel;
};

module.exports = new ChannelService();