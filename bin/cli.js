#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const program = require('commander');
const ora = require('ora');
const isUrl = require('is-url');
const bold = require('ansi-bold');

// eslint-disable-next-line no-sync
const pkg = fs.readFileSync(
    path.join(__dirname, '..', 'package.json')
).toJSON();
const { attack } = require('../index');
const { displaySummary, displayError } = require('../src/display');

program
    .version(pkg.version)
    .option('-u, --url <url>', 'Define URL to attack. Ex. http://example.org/')
    .option('-t, --timelimit [numbers]', 'Define list of time thresholds (in seconds). Ex. 10,100,1000')
    .description('Example:\n\tmakiwara -u http://localhost:3000 -t 10')
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

const url = program.url;
const timeLimit = program.timelimit.split(',').map(Number);

function displayDelimiter() {
    console.gray('----------------------------------------------------\n');
}

function displayHeader() {
    console.log(`${pkg.name}, Version ${pkg.version}`);
    console.log(`Copyright 2017 ${pkg.author.name} <${pkg.author.email}> ${pkg.author.url}`);
    console.log(`The ${pkg.license} License, https://piecioshka.mit-license.org/\n`);
    console.log(`> ${pkg.description}\n`);
}

displayHeader();

const spinner = ora('Loading').start();

attack(url, timeLimit)
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
