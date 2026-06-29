import {
    makeRequestsInConcurrentMode,
    makeRequestsInSequenceMode,
    BenchmarkResult,
} from "./make-requests";

type StrategyFunction = (
    url: string,
    duration: number
) => Promise<BenchmarkResult>;

const strategies = new Map<string, StrategyFunction>();
strategies.set("sequence", makeRequestsInSequenceMode);
strategies.set("concurrent", makeRequestsInConcurrentMode);

function benchmark(
    url: string,
    timeLimits: number[],
    strategy: string
): Promise<BenchmarkResult[]> {
    const method = strategies.get(strategy);

    if (!method) {
        return Promise.reject(new TypeError(`Unknown strategy: ${strategy}`));
    }

    return Promise.all(
        timeLimits
            // Remove zeros timeLimits
            .filter((k) => k)
            .map((duration) => method(url, duration))
    );
}

export { benchmark };
