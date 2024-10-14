#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const http = require('http');
const https = require('https');
http.globalAgent.maxSockets = https.globalAgent.maxSockets = 512;
// http.globalAgent.maxFreeSockets = https.globalAgent.maxFreeSockets = 512;

const program = require('commander');
const ora = require('ora');
const isUrl = require('is-url');
const bold = require('ansi-bold');

const { attack } = require('../index');
const HTTP_STATUS = require('../src/http-status-codes');
const { displaySummary, displayError } = require('../src/display');
const { makeRequest } = require('../src/make-requests');

// eslint-disable-next-line no-sync
const pkg = JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', 'package.json')
).toString());
const STRATEGY_REGEXP = /^(concurrent|sequence)$/;

program
    .version(pkg.version)
    .option('-u, --url <url>', 'Define URL to attack. Ex. https://example.org/')
    .option('-t, --timelimit [numbers]', 'Define list of time thresholds (in seconds). Ex. 10,100,1000')
    .option('-s, --strategy <concurrent|sequence>', 'Define strategy for making requests')
    .description('Example:\n\tmakiwara -u https://localhost:3000 -t 10 -s sequence')
    .parse(process.argv);

if (typeof program.url !== 'string') {
    console.red('Error: url is not a string');
    program.help();
}

if (!isUrl(program.url)) {
    console.red('Error: url is not correct format');
    program.help();
}

if (!program.timelimit) {
    program.timelimit = '1,3,5';
    console.yellow('Ups... you did not put "timelimit" of thresholds');
    console.yellow(`Thresholds are sets to: ${bold(program.timelimit)} (seconds)\n`);
}

if (!(STRATEGY_REGEXP).test(program.strategy)) {
    program.strategy = 'concurrent';
    console.yellow('Ups... you did not put "strategy"');
    console.yellow(`Default strategy is: ${program.strategy}\n`);
}

const url = program.url;
const timeLimit = program.timelimit.split(',').map(Number);
const strategy = program.strategy;
let spinner = null;

function displayDelimiter() {
    console.gray('----------------------------------------------------\n');
}

function displayHeader() {
    console.log(`${pkg.name}, Version ${pkg.version}`);
    const currentYear = new Date().getFullYear();
    console.log(`Copyright 2017-${currentYear} ${pkg.author.name} <${pkg.author.email}> ${pkg.author.url}`);
    console.log(`The ${pkg.license} License, https://piecioshka.mit-license.org/\n`);
    console.log(`> ${pkg.description}\n`);
}

async function sendTestRequest(testUrl) {
    spinner.succeed(`Start testing... ${bold(testUrl)}`);
    const response = await makeRequest(testUrl, { agent: false });
    if (response.status !== HTTP_STATUS.OK) {
        console.red(`HTTP Status Code: ${bold(response.status)}`);
        console.yellow(`Response Body: ${bold(response.text)}`);
    }
    spinner.succeed(`Testing completed (response: ${bold(response.text.length)} Bytes)`);
}

async function main() {
    displayHeader();

    spinner = ora('Loading').start();

    try {
        await sendTestRequest(url);

        spinner.succeed('Start attacking...');
        const results = await attack(url, timeLimit, strategy);
        spinner.stop();
        spinner.succeed('Attacking completed\n');

        results.forEach((result, index) => {
            displaySummary(result);

            if (index < results.length - 1) {
                displayDelimiter();
            }
        });
    } catch (err) {
        spinner.stop();
        displayError(err);
    }

    // eslint-disable-next-line no-process-exit
    process.exit(0);
}

main();
