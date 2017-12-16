const { makeRequests } = require('./src/make-requests');
const { collapseArray } = require('./src/object-util');

async function attack(quantity, url) {
    const statusCodes = await makeRequests(quantity, url);
    return collapseArray(statusCodes);
}

module.exports = {
    attack
};
