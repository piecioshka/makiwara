const nock = require("nock");
const HTTP_STATUS = require("./http-status-codes");
const { benchmark } = require("./benchmark");

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
