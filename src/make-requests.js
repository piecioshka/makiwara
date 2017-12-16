const request = require('axios');

async function makeRequest(url) {
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

async function makeRequests(quantity, url) {
    quantity = Number(quantity);

    if (Number.isNaN(quantity)) {
        throw new TypeError('Put numer of request (as digits)');
    }

    const result = [];

    for (let i = 0; i < quantity; i++) {
        const statisticResponse = await makeRequest(url);
        result.push(statisticResponse);
    }

    return result;
}

module.exports = {
    makeRequests
};
