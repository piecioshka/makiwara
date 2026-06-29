import { describe, it, expect } from "vitest";
import nock from "nock";

import * as HTTP_STATUS from "./http-status-codes";
import { benchmark } from "./benchmark";

describe("Benchmark", () => {
    it("benchmark should send request", async () => {
        const targetUrl = "https://localhost/";
        nock(targetUrl).persist().get("/").reply(204, []);

        const responses = await benchmark(targetUrl, [1], "sequence");
        const requests = responses[0].requests;
        const status = requests[0].status;
        expect(status).toEqual(HTTP_STATUS.NO_CONTENT);
    });
});
