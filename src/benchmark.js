const {
    makeRequestsInConcurrentMode,
    makeRequestsInSequenceMode,
} = require("./make-requests");

const strategies = new Map();
strategies.set("sequence", makeRequestsInSequenceMode);
strategies.set("concurrent", makeRequestsInConcurrentMode);

function benchmark(url, timeLimits, strategy) {
    const method = strategies.get(strategy);

    return Promise.all(
        timeLimits
            // Remove zeros timeLimits
            .filter((k) => k)
            .map((duration) => method(url, duration))
    );
}

module.exports = {
    benchmark,
};
