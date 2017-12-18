'use strict';

const { attack } = require('../../../');
const HTTPStatusCodes = require('http-status-codes');

const EXAMPLE_URL = 'http://example.org';
const EXAMPLE_TIMES = [1];

describe('General', () => {
    it('attack should be defined', () => {
        expect(typeof attack === 'function').toEqual(true);
    });

    it('attack return Promise', (done) => {
        attack(EXAMPLE_URL, EXAMPLE_TIMES)
            .then(() => {
                expect(1).toEqual(1);
                done();
            });
    });

    it('attack require parameters', () => {
        expect(() => {
            return attack()
        }).toThrow();
    });

    it('attack should send request', (done) => {
        attack(EXAMPLE_URL, EXAMPLE_TIMES)
            .then((response) => {
                expect(response[0].requests[0].statusCode).toEqual(HTTPStatusCodes.OK);
                done();
            });
    });
});
