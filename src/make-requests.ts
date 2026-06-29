import * as http from "http";

// const makeRequest = require('node-fetch');
import makeRequest, { FetchResponse } from "./local-fetch";

const SECOND_IN_MILLISECONDS = 1000;

export interface BenchmarkResult {
    type: string;
    startTime: number;
    endTime: number;
    duration: number;
    times: number;
    requests: FetchResponse[];
}

function pause(timeoutInSeconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeoutInSeconds * SECOND_IN_MILLISECONDS);
    });
}

function status(i: number): void {
    process.stdout.write(`\rLoading: ${i} time(s)`);
}

async function makeRequestsInConcurrentMode(
    url: string,
    durationInSeconds: number
): Promise<BenchmarkResult> {
    if (isNaN(durationInSeconds)) {
        throw new TypeError("duration should be a number (ex. 1,3,5)");
    }

    const requests: FetchResponse[] = [];
    const startTime = Date.now();
    const durationInMilliseconds = durationInSeconds * SECOND_IN_MILLISECONDS;
    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const currentTime = Date.now();

        if (i >= http.globalAgent.maxSockets) {
            break;
        }

        if (currentTime > startTime + durationInMilliseconds) {
            break;
        }

        i++;

        status(i);

        await makeRequest(url, { agent: false }).then((response) => {
            requests.push(response);
        });
    }

    const endTime = Date.now();
    const wholeProcessDuration = endTime - startTime;

    await pause(durationInSeconds);

    return {
        type: "Concurrent",
        startTime,
        endTime,
        duration: wholeProcessDuration,
        times: i,
        requests,
    };
}

async function makeRequestsInSequenceMode(
    url: string,
    durationInSeconds: number
): Promise<BenchmarkResult> {
    if (isNaN(durationInSeconds)) {
        throw new TypeError("duration should be a number (ex. 1,3,5)");
    }

    const requests: FetchResponse[] = [];
    const startTime = Date.now();
    const durationInMilliseconds = durationInSeconds * SECOND_IN_MILLISECONDS;
    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const currentTime = Date.now();

        if (currentTime > startTime + durationInMilliseconds) {
            break;
        }

        i++;

        status(i);

        const response = await makeRequest(url, { agent: false });
        requests.push(response);
    }

    const endTime = Date.now();
    const wholeProcessDuration = endTime - startTime;

    return {
        type: "Sequence",
        startTime,
        endTime,
        duration: wholeProcessDuration,
        times: i,
        requests,
    };
}

export { makeRequest, makeRequestsInSequenceMode, makeRequestsInConcurrentMode };
