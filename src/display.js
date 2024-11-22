const { table } = require("table");
const HTTPStatusCodes = require("http-status-codes");
const bold = require("ansi-bold");

const logger = require("../src/color-logs");

const SECOND_IN_MILLISECONDS = 1000;

const tableOptions = {
    columns: {
        0: { width: 22 },
        1: { width: 30 },
    },
};

function displayRequestsSummary(results) {
    const aggregateResults = results.requests.reduce((acc, item) => {
        acc[item.status] = acc[item.status] ? acc[item.status] + 1 : 1;
        return acc;
    }, {});

    const codes = Object.keys(aggregateResults).map(Number);

    if (codes.length === 0) {
        logger.error("No requests were made");
        return;
    }

    const statuses = codes.reduce((acc, code) => {
        const label = HTTPStatusCodes.getReasonPhrase(code);
        acc[`${code} ${label}`] = aggregateResults[code];
        return acc;
    }, {});

    const data = [
        ["HTTP Status Code", "Requests quantity"].map(bold),
        ...Object.entries(statuses),
    ];

    console.log(table(data, tableOptions));
}

function displayBenchmarkSummary(results) {
    const meta = [];
    meta.push([bold("Type"), results.type]);
    const durationInSeconds = results.duration / SECOND_IN_MILLISECONDS;
    meta.push([
        bold("Effective Duration"),
        `${durationInSeconds.toLocaleString()} seconds`,
    ]);
    meta.push([bold("Times"), results.times]);
    console.log(table(meta, tableOptions));
}

function displaySummary(results) {
    displayRequestsSummary(results);
    displayBenchmarkSummary(results);
}

module.exports = {
    displaySummary,
};
