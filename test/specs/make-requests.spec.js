const nock = require('nock');
const { makeRequest, makeRequestsInConcurrentMode, makeRequestsInSequenceMode } = require('../../src/make-requests');
const HTTP_STATUS = require('../../src/http-status-codes');

const URL = 'http://localhost/';
const ONE_SECOND = 1;

describe('makeRequests', () => {
    beforeEach(() => {
        nock(URL)
            .get('/')
            .delay(100)
            .times(Infinity)
            .reply(204, []);
    });

    fit('should returns status code', async () => {
        const response = await makeRequest(URL, { agent: false });
        expect(response.status).toEqual(HTTP_STATUS.NO_CONTENT);
    });

    it('should make HTTP requests in concurrent mode', async (done) => {
        const results = await makeRequestsInConcurrentMode(URL, ONE_SECOND);
        setTimeout(() => {
            expect(results.requests.length).toBeGreaterThan(10);
            done();
        }, 100);
    });

    it('should make HTTP requests in sequence mode', async (done) => {
        const results = await makeRequestsInSequenceMode(URL, ONE_SECOND);
        setTimeout(() => {
            expect(results.requests.length).toBeLessThan(11);
            done();
        }, 100);
    });
});
