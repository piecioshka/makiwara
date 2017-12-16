const { table } = require('table');

const { getDiffTime } = require('./time-box');
const HTTPStatusCodes = require('http-status-codes');

function appendHttpStatusCodeLabel(statusCodeEntries) {
    statusCodeEntries.forEach((entry) => {
        const label = HTTPStatusCodes.getStatusText([entry[0]]);
        if (typeof label === 'string') {
            entry[0] = `${entry[0]} ${label}`;
        }
    });
}

function displayHeader() {
    console.log(`Test are started on ${new Date().toISOString()}\n`);
}

function displayResults(statusCodes) {
    console.log('Results board:\n');

    appendHttpStatusCodeLabel(statusCodes);

    const data = [['HTTP Status Code', 'Quantity']].concat(statusCodes);
    const output = table(data);

    console.log(output);
    displayTimeBox(statusCodes);
}

function displayError(err) {
    console.log(`${err.name}: ${err.message}\n`);
    displayTimeBox();
}

function displayTimeBox(statusCodes) {
    const average = getDiffTime() / statusCodes.reduce((m, i) => m + i[1], 0);
    console.log(` - Average of request time: ${average} ms`);
    console.log(`\nTest are finished on ${new Date().toISOString()}\n`);
}

module.exports = {
    displayHeader,
    displayResults,
    displayError
};
