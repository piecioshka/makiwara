const nock = require("nock");
const {
    makeRequest,
    makeRequestsInConcurrentMode,
    makeRequestsInSequenceMode,
} = require("./make-requests");
const HTTP_STATUS = require("./http-status-codes");

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

    it.skip("should make HTTP requests in concurrent mode", async (done) => {
        const results = await makeRequestsInConcurrentMode(targetUrl, 1);
        setTimeout(() => {
            expect(results.requests.length).toBeGreaterThan(10);
            done();
        }, 100);
    });

    it.skip("should make HTTP requests in sequence mode", async (done) => {
        const results = await makeRequestsInSequenceMode(targetUrl, 1);
        setTimeout(() => {
            expect(results.requests.length).toBeLessThan(11);
            done();
        }, 100);
    });
});
