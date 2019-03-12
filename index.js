'use strict';

const { makeRequests } = require('./src/make-requests');

require('./src/color-logs');

function attack(url, timeLimits) {
    // Remove zeros timeLimits
    return Promise.all(
        timeLimits
            .filter((k) => k)
            .map((duration) => makeRequests(url, duration))
    );
}

module.exports = {
    attack
};
