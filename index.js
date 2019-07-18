const { makeRequestsInConcurrentMode, makeRequestsInSequenceMode } = require('./src/make-requests');

require('./src/color-logs');

const strategies = new Map();
strategies.set('sequence', makeRequestsInSequenceMode);
strategies.set('concurrent', makeRequestsInConcurrentMode);

function attack(url, timeLimits, strategy) {
    const method = strategies.get(strategy);

    return Promise.all(
        timeLimits
            // Remove zeros timeLimits
            .filter((k) => k)
            .map((duration) => method(url, duration))
    );
}

module.exports = {
    attack
};
