'use strict';

const { makeRequests } = require('./src/make-requests');

require('./src/color-logs');

function attack(url, times) {
    // Remove zeros times
    times = times.filter(k => k);
    return Promise.all(times.map((time) => makeRequests(url, time)));
}

module.exports = {
    attack
};
