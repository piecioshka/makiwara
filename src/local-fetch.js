const http = require("http");
const https = require("https");

const IS_HTTP = /^https/;

function getProtocol(url) {
    if (IS_HTTP.test(url)) {
        return https;
    }
    return http;
}

async function makeRequest(url, options = {}) {
    const response = {
        status: 0,
        text: "",
    };
    const protocol = getProtocol(url);
    return new Promise((resolve, reject) => {
        protocol.get(url, options, (res) => {
            res.addListener("data", (buffer) => {
                response.text += buffer.toString();
            });
            res.addListener("error", (err) => {
                reject(err);
            });
            res.addListener("end", () => {
                response.status = Number(res.statusCode);
                resolve(response);
            });
        });
    });
}

module.exports = makeRequest;
module.exports.makeRequest = makeRequest;
