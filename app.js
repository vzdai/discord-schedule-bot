require('dotenv').config();

const Discord = require('discord.js');

const bot = new Discord.Client();

require('./bot/bot.js')(bot);
require('./database/connect');



// add bot to server:
// https://discordapp.com/api/oauth2/authorize?client_id=295184483320070144&scope=bot&permissions=0