const { makeRequests } = require('./src/make-requests');

require('./src/color-logs');

function attack(url, times) {
    return Promise.all(times.map((time) => makeRequests(url, time)));
}

module.exports = {
    attack
};
