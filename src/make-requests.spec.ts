import { describe, it, expect, beforeEach } from "vitest";
import nock from "nock";

import {
    makeRequest,
    makeRequestsInConcurrentMode,
    makeRequestsInSequenceMode,
} from "./make-requests";
import * as HTTP_STATUS from "./http-status-codes";

describe("makeRequests", () => {
    const targetUrl = "https://localhost/";

    beforeEach(() => {
        nock(targetUrl)
            .persist()
            .get("/")
            .delay(100)
            .times(Infinity)
            .reply(204, []);
    });

    it("should returns status code", async () => {
        const response = await makeRequest(targetUrl, { agent: false });
        expect(response.status).toEqual(HTTP_STATUS.NO_CONTENT);
    });

    it.skip("should make HTTP requests in concurrent mode", async () => {
        const results = await makeRequestsInConcurrentMode(targetUrl, 1);
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(results.requests.length).toBeGreaterThan(10);
    });

    it.skip("should make HTTP requests in sequence mode", async () => {
        const results = await makeRequestsInSequenceMode(targetUrl, 1);
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(results.requests.length).toBeLessThan(11);
    });
});
