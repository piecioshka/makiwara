'use strict';

const { table } = require('table');
const HTTPStatusCodes = require('http-status-codes');
const bold = require('ansi-bold');

const { collapseArray } = require('./object-util');

const tableOptions = {
    columns: {
        0: { width: 20 },
        1: { width: 25 }
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

    console.cyan(`Requests summary of ${attackResults.limit} second(s):`);
    if (isEmptyResults) {
        console.log('  No request were sent\n');
    } else {
        appendHttpStatusCodeLabel(statusCodes);
        const data = [['HTTP Status Code', 'Quantity'].map(bold)]
            .concat(statusCodes);
        console.log(table(data, tableOptions));
    }
}

function displayAttackSummary(attackResults) {
    console.cyan(`Attack summary of ${attackResults.limit} second(s):`);
    const meta = [];
    meta.push(['Start time', new Date(attackResults.startTime).toISOString()]);
    meta.push(['End time', new Date(attackResults.endTime).toISOString()]);
    meta.push(['Duration', `${(attackResults.endTime - attackResults.startTime)} ms`]);
    meta.push(['Time limit', `${attackResults.limit * 1000} ms`]);
    const average = (attackResults.limit * 1000 / attackResults.requests.length);
    const averageVerbose = Number.isFinite(average)
        ? `${average.toFixed(3)} ms/req.`
        : '-';
    meta.push(['Avg. request time', averageVerbose]);
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
