var moment = require('moment');
moment().format();

var exports = module.exports = {};

// given array of strings, return a string listing them all.
exports.createStringList = (strings) => {
    let result = '';

    strings.forEach((string) => {
        result += string;
        result += ', ';
    });

    return result.substr(0, result.length - 2);
};

// HH:MM [am/pm] MM/DD/YYYY
exports.parseDate = (input) => {
    const date = moment(input, "hh:mm a MM/DD/YYYY");
    console.log('moment parsed date', date);
    if (!date.isValid()) {
        console.log('moment found invalid date');
        return;
    }
    console.log('moment has valid date');
    const formatted = date.format('YYYY-MM-DD HH:mm:ss');
    console.log('moment formatted date', formatted);
    return formatted;
};

