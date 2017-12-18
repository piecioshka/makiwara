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
 * @param {number} limit - In seconds
 * @returns {Promise}
 */
async function makeRequests(url, limit) {
    limit = Number(limit);

    if (Number.isNaN(limit)) {
        throw new TypeError('Put numer of limit time of making requests (ex. 1,3,5)');
    }

    const millisecondTimeLimit = limit * 1000;
    const requests = [];
    const startTime = Date.now();

    while (true) {
        const startRequestTime = Date.now();
        const statusCode = await fetchStatusCode(url);
        const endRequestTime = Date.now();
        const requestDuration = (endRequestTime - startRequestTime);

        const diffTime = (endRequestTime - startTime);
        const duration = (diffTime - millisecondTimeLimit);

        if (duration > 0) {
            break;
        }

        requests.push({
            statusCode,
            duration: requestDuration
        });
    }

    const endTime = Date.now();

    return {
        startTime,
        endTime,
        limit,
        requests
    };
}

module.exports = {
    makeRequests
};
