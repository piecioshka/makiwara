const http = require('http');
const https = require('https');

const IS_HTTP = (/^https/);

function getProtocol(url) {
    if (IS_HTTP.test(url)) {
        return https;
    }
    return http;
}

async function makeRequest(url, options = {}) {
    const response = {
        status: null,
        text: '',
    };
    const protocol = getProtocol(url);
    return new Promise((resolve, reject) => {
        protocol.get(url, options, (res) => {
            res.addListener('data', (data) => {
                response.text += data.toString();
            });
            res.addListener('error', (err) => {
                reject(err);
            });
            res.addListener('end', () => {
                response.status = res.statusCode;
                resolve(response);
            });
        });
    });
}

module.exports = makeRequest;
module.exports.makeRequest = makeRequest;
