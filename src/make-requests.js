const http = require('http');

// const makeRequest = require('node-fetch');
const makeRequest = require('./local-fetch');

const SECOND_IN_MILLISECONDS = 1000;

function pause(timeoutInSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeoutInSeconds * SECOND_IN_MILLISECONDS);
    });
}

function status(i) {
    if (global.spinner) {
        global.spinner.text = `Loading: ${i} time(s)`;
        global.spinner.render();
    }
}

async function makeRequestsInConcurrentMode(url, durationInSeconds) {
    if (isNaN(durationInSeconds)) {
        throw new TypeError('duration should be a number (ex. 1,3,5)');
    }

    const requests = [];
    const startTime = Date.now();
    const durationInMilliseconds = durationInSeconds * SECOND_IN_MILLISECONDS;
    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const currentTime = Date.now();

        if (i >= http.globalAgent.maxSockets) {
            break;
        }

        if (currentTime > startTime + durationInMilliseconds) {
            break;
        }

        i++;

        status(i);

        await makeRequest(url, { agent: false })
            .then((response) => {
                requests.push(response);
            });
    }

    const endTime = Date.now();
    const wholeProcessDuration = endTime - startTime;

    await pause(durationInSeconds);

    return {
        type: 'Concurrent',
        startTime,
        endTime,
        duration: wholeProcessDuration,
        times: i,
        requests
    };
}

async function makeRequestsInSequenceMode(url, durationInSeconds) {
    if (isNaN(durationInSeconds)) {
        throw new TypeError('duration should be a number (ex. 1,3,5)');
    }

    const requests = [];
    const startTime = Date.now();
    const durationInMilliseconds = durationInSeconds * SECOND_IN_MILLISECONDS;
    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const currentTime = Date.now();

        if (currentTime > startTime + durationInMilliseconds) {
            break;
        }

        i++;

        status(i);

        const response = await makeRequest(url, { agent: false });
        requests.push(response);
    }

    const endTime = Date.now();
    const wholeProcessDuration = endTime - startTime;

    return {
        type: 'Sequence',
        startTime,
        endTime,
        duration: wholeProcessDuration,
        times: i,
        requests
    };
}

module.exports = {
    makeRequest,
    makeRequestsInSequenceMode,
    makeRequestsInConcurrentMode
};
