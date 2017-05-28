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

