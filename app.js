require('dotenv').config();

const Discord = require('discord.js');

const bot = new Discord.Client();

require('./bot/bot.js')(bot);




/*
commands:
    @bot join scheduler

    start group
    create event for group at TIME
    get available members at TIME




on user join server
- would you like to join the scheduler?



 */