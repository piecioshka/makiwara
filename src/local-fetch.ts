import * as http from "http";
import * as https from "https";

export interface FetchResponse {
    status: number;
    text: string;
}

const IS_HTTP = /^https/;

function makeRequest(
    url: string,
    options: http.RequestOptions = {}
): Promise<FetchResponse> {
    const response: FetchResponse = {
        status: 0,
        text: "",
    };

    return new Promise((resolve, reject) => {
        const onResponse = (res: http.IncomingMessage): void => {
            res.addListener("data", (buffer: Buffer) => {
                response.text += buffer.toString();
            });
            res.addListener("error", (err: Error) => {
                reject(err);
            });
            res.addListener("end", () => {
                response.status = Number(res.statusCode);
                resolve(response);
            });
        };

        if (IS_HTTP.test(url)) {
            https.get(url, options, onResponse);
        } else {
            http.get(url, options, onResponse);
        }
    });
}

export default makeRequest;
export { makeRequest };
