#!/usr/bin/env node

'use strict';

const program = require('commander');
const ora = require('ora');
const isUrl = require('is-url');
const bold = require('ansi-bold');

const version = require('../package.json').version;
const { attack } = require('../index');
const { displaySummary, displayError } = require('../src/display');

program
    .version(version)
    .option('-u, --url <url>', 'Define URL to attack')
    .option('-t, --times [times]', 'Define list of time thresholds (in seconds)')
    .parse(process.argv);

if (typeof program.url !== 'string') {
    throw new TypeError('url is required and should be a string');
}

if (!isUrl(program.url)) {
    throw new TypeError(`url is not correct format`);
}

if (!program.times) {
    program.times = '1,3,5';
    console.yellow('Ups... you did not put times of thresholds');
    console.yellow(`Thresholds are sets to: ${bold(program.times)} (seconds)\n`);
}

const url = program.url;
const times = program.times.split(',').map(Number);

const spinner = ora('Loading').start();

function displayDelimiter() {
    console.gray('----------------------------------------------------\n');
}

attack(url, times)
    .then((results) => {
        spinner.stop();
        results.forEach((result, index) => {
            displaySummary(result);
            if (index < results.length - 1) {
                displayDelimiter();
            }
        });
    })
    .catch((err) => {
        spinner.stop();
        displayError(err);
    });
