const nock = require('nock');
const HTTP_STATUS = require('../../src/http-status-codes');
const { attack } = require('../..');

const URL = 'http://localhost/';

it('attack should send request', async () => {
    nock(URL)
        .get('/')
        .reply(204, []);

    const responses = await attack(URL, [1], 'sequence');
    const requests = responses[0].requests;
    const status = requests[0].status;
    expect(status).toEqual(HTTP_STATUS.NO_CONTENT);
});
