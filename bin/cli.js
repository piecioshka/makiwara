#!/usr/bin/env node

const http = require("http");
const https = require("https");
http.globalAgent.maxSockets = https.globalAgent.maxSockets = 512;
// http.globalAgent.maxFreeSockets = https.globalAgent.maxFreeSockets = 512;

const { Command } = require("commander");
const program = new Command();

const ora = require("ora");
const isUrl = require("is-url");
const bold = require("ansi-bold");

const logger = require("../src/color-logs");
const { benchmark } = require("../index");
const HTTP_STATUS = require("../src/http-status-codes");
const { displaySummary } = require("../src/display");
const { makeRequest } = require("../src/make-requests");

const pkg = require("../package.json");
const STRATEGY_REGEXP = /^(concurrent|sequence)$/;

program
    .version(pkg.version)
    .option(
        "-u, --url <url>",
        "Define URL to benchmark. Ex. https://example.org/"
    )
    .option(
        "-t, --timelimit [numbers]",
        "Define list of time thresholds (in seconds). Ex. 10,100,1000"
    )
    .option(
        "-s, --strategy <concurrent|sequence>",
        "Define strategy for making requests"
    )
    .description(
        "Example:\n\tmakiwara -u https://localhost:3000 -t 10 -s sequence"
    )
    .parse(process.argv);

const options = program.opts();

if (typeof options.url !== "string") {
    displayHeader();
    logger.red("Error: url is not a string\n");
    program.help();
}

if (!isUrl(options.url)) {
    displayHeader();
    logger.red("Error: url is not correct format\n");
    program.help();
}

if (!options.timelimit) {
    options.timelimit = "1,3,5";
    logger.yellow('Ups... you did not define "timelimit" of thresholds');
    logger.yellow(
        `Thresholds are sets to: ${bold(options.timelimit)} (seconds)\n`
    );
}

if (!STRATEGY_REGEXP.test(options.strategy)) {
    options.strategy = "concurrent";
    logger.yellow('Ups... you did not define "strategy"');
    logger.yellow(`Default strategy is: ${options.strategy}\n`);
}

const url = options.url;
const timeLimit = options.timelimit.split(",").map(Number);
const strategy = options.strategy;
let spinner = null;

function displayDelimiter() {
    logger.gray("----------------------------------------------------\n");
}

function displayHeader() {
    const author = `${pkg.author.name} <${pkg.author.email}> ${pkg.author.url}`;
    console.log(`${pkg.name} v${pkg.version}`);
    console.log(`Copyright (c) ${new Date().getFullYear()} ${author}\n`);
}

async function sendTestRequest(testUrl) {
    spinner.succeed(`Start testing... ${bold(testUrl)}`);
    const response = await makeRequest(testUrl, { agent: false });
    if (response.status !== HTTP_STATUS.OK) {
        logger.red(`HTTP Status Code: ${bold(response.status)}`);
        logger.yellow(`Response Body: ${bold(response.text)}`);
    }
    spinner.succeed(
        `Testing completed (response: ${bold(response.text.length)} Bytes)`
    );
}

async function main() {
    displayHeader();

    spinner = ora("Loading").start();

    try {
        await sendTestRequest(url);

        spinner.succeed("Start benchmarking...");
        const results = await benchmark(url, timeLimit, strategy);
        spinner.stop();
        spinner.succeed("Benchmarking completed\n");

        results.forEach((result, index) => {
            displaySummary(result);

            if (index < results.length - 1) {
                displayDelimiter();
            }
        });
    } catch (err) {
        spinner.stop();
        logger.red(err);
    }

    // eslint-disable-next-line no-process-exit
    process.exit(0);
}

main();
