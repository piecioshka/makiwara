'use strict';

const request = require('axios');

/**
 * @param {string} url
 * @returns {Promise}
 */
async function fetchStatusCode(url) {
    try {
        const response = await request.get(url);
        return response.status;
    } catch (err) {
        if (err.response) {
            return err.response.status;
        } else {
            return 0;
        }
    }
}

/**
 * @param {string} url
 * @param {number} durationLimit - In seconds
 * @returns {Promise}
 */
async function makeRequests(url, durationLimit) {
    durationLimit = Number(durationLimit);

    if (Number.isNaN(durationLimit)) {
        throw new TypeError('Put numer of durationLimit time of making requests (ex. 1,3,5)');
    }

    const millisecondTimeLimit = durationLimit * 1000;
    const requests = [];
    const startTime = Date.now();

    while (true) {
        const startRequestTime = Date.now();
        const statusCode = await fetchStatusCode(url);
        const endRequestTime = Date.now();
        const requestDuration = (endRequestTime - startRequestTime);

        const diffTime = (endRequestTime - startTime);
        const offset = (diffTime - millisecondTimeLimit);

        if (offset > 0) {
            break;
        }

        requests.push({
            statusCode,
            duration: requestDuration
        });
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
        startTime,
        endTime,
        durationLimit,
        duration,
        requests
    };
}

module.exports = {
    makeRequests
};
