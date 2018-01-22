'use strict';

const { table } = require('table');
const HTTPStatusCodes = require('http-status-codes');
const bold = require('ansi-bold');

const { collapseArray } = require('./object-util');

const tableOptions = {
    columns: {
        0: { width: 20 },
        1: { width: 30 }
    }
};

function appendHttpStatusCodeLabel(statusCodeEntries) {
    statusCodeEntries.forEach((entry) => {
        let label = null;
        try {
            label = HTTPStatusCodes.getStatusText(entry[0]);
        } catch (err) {
            console.red(err);
        }
        if (typeof label === 'string') {
            entry[0] = `${entry[0]} ${label}`;
        }
    });
}

function displayRequestsSummary(attackResults) {
    const statusCodes = collapseArray(attackResults.requests.map(r => r.statusCode));
    const isEmptyResults = (statusCodes.length === 0);

    if (isEmptyResults) {
        console.log('  No request were sent\n');
    } else {
        appendHttpStatusCodeLabel(statusCodes);
        const data = [['HTTP Status Code', 'Requests quantity'].map(bold)]
            .concat(statusCodes);
        console.log(table(data, tableOptions));
    }
}

function displayAttackSummary(attackResults) {
    const meta = [];
    meta.push(['Concurrency Level', 1]);
    meta.push(['Time taken for tests', `${(attackResults.duration / 1000).toLocaleString()} seconds`]);
    const rps = (attackResults.requests.length / attackResults.duration * 1000);
    meta.push(['Requests per second', `${rps.toFixed(3)} [#/sec] (mean)`]);
    console.log(table(meta, tableOptions));
}

function displaySummary(attackResults) {
    displayRequestsSummary(attackResults);
    displayAttackSummary(attackResults);
}

function displayError(err) {
    console.log(`${err.name}: ${err.message}\n`);
}

module.exports = {
    displaySummary,
    displayError
};
