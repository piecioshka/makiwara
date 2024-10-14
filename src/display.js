const { table } = require("table");
const HTTPStatusCodes = require("http-status-codes");
const bold = require("ansi-bold");

const { collapseArray } = require("./object-util");

const SECOND_IN_MILLISECONDS = 1000;

const tableOptions = {
    columns: {
        0: { width: 22 },
        1: { width: 30 },
    },
};

function appendHttpStatusCodeLabel(statusCodeEntries) {
    statusCodeEntries.forEach((entry) => {
        let label = null;
        try {
            label = HTTPStatusCodes.getStatusText(entry[0]);
        } catch (err) {
            console.red(err);
        }
        if (typeof label === "string") {
            entry[0] = `${entry[0]} ${label}`;
        }
    });
}

function displayRequestsSummary(attackResults) {
    const statusCodes = collapseArray(
        attackResults.requests.map((r) => r.status)
    );
    const isEmptyResults = statusCodes.length === 0;

    if (isEmptyResults) {
        statusCodes["-"] = -1;
    } else {
        appendHttpStatusCodeLabel(statusCodes);
    }

    const data = [["HTTP Status Code", "Requests quantity"].map(bold)].concat(
        statusCodes
    );
    console.log(table(data, tableOptions));
}

function displayAttackSummary(results) {
    const meta = [];
    meta.push(["Type", results.type]);
    const durationInSeconds = results.duration / SECOND_IN_MILLISECONDS;
    meta.push([
        "Effective Duration",
        `${durationInSeconds.toLocaleString()} seconds`,
    ]);
    meta.push(["Times", `${results.times}`]);
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
    displayError,
};
