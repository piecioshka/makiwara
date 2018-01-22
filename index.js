'use strict';

const { makeRequests } = require('./src/make-requests');

require('./src/color-logs');

function attack(url, timeLimits) {
    // Remove zeros timeLimits
    timeLimits = timeLimits.filter(k => k);
    return Promise.all(timeLimits.map((duration) => makeRequests(url, duration)));
}

module.exports = {
    attack
};
