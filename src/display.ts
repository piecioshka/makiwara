import { table, TableUserConfig } from "table";
import * as HTTPStatusCodes from "http-status-codes";
import bold from "ansi-bold";

import * as logger from "./color-logs";
import { BenchmarkResult } from "./make-requests";

const SECOND_IN_MILLISECONDS = 1000;

const tableOptions: TableUserConfig = {
    columns: {
        0: { width: 22 },
        1: { width: 30 },
    },
};

function displayRequestsSummary(results: BenchmarkResult): void {
    const aggregateResults = results.requests.reduce<Record<number, number>>(
        (acc, item) => {
            acc[item.status] = acc[item.status] ? acc[item.status] + 1 : 1;
            return acc;
        },
        {}
    );

    const codes = Object.keys(aggregateResults).map(Number);

    if (codes.length === 0) {
        logger.error("No requests were made");
        return;
    }

    const statuses = codes.reduce<Record<string, number>>((acc, code) => {
        const label = HTTPStatusCodes.getReasonPhrase(code);
        acc[`${code} ${label}`] = aggregateResults[code];
        return acc;
    }, {});

    const data: (string | number)[][] = [
        ["HTTP Status Code", "Requests quantity"].map(bold),
        ...Object.entries(statuses),
    ];

    console.log(table(data, tableOptions));
}

function displayBenchmarkSummary(results: BenchmarkResult): void {
    const meta: (string | number)[][] = [];
    meta.push([bold("Type"), results.type]);
    const durationInSeconds = results.duration / SECOND_IN_MILLISECONDS;
    meta.push([
        bold("Effective Duration"),
        `${durationInSeconds.toLocaleString()} seconds`,
    ]);
    meta.push([bold("Times"), results.times]);
    console.log(table(meta, tableOptions));
}

function displaySummary(results: BenchmarkResult): void {
    displayRequestsSummary(results);
    displayBenchmarkSummary(results);
}

export { displaySummary };
