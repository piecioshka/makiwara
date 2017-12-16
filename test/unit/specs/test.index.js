'use strict';

const { attack } = require('../../../');
const HTTPStatusCodes = require('http-status-codes');

describe('General', () => {
    it('attack should be defined', () => {
        expect(typeof attack === 'function').toEqual(true);
    });

    it('attack return Promise (check by then)', (done) => {
        attack(0)
            .then(() => {
                expect(1).toEqual(1);
                done();
            });
    });

    it('attack return Promise (check by catch)', (done) => {
        attack()
            .catch(() => {
                expect(1).toEqual(1);
                done();
            });
    });

    it('attack should send request', (done) => {
        const times = 3;
        attack(times, 'http://example.org')
            .then((response) => {
                expect(response[0][0]).toEqual(HTTPStatusCodes.OK);
                expect(response[0][1]).toEqual(times);
                done();
            });
    });
});
