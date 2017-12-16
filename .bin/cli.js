#!/usr/bin/env node

const program = require('commander');
const ora = require('ora');

const version = require('../package.json').version;
const { attack } = require('../index');
const { displayHeader, displayResults, displayError } = require('../src/display');
const { start, stop } = require('../src/time-box');

program
    .version(version)
    .arguments('<quantity> <url>')
    .action(function (quantity, url) {
        displayHeader();
        const spinner = ora('Loading').start();
        start();

        return attack(quantity, url)
            .then((result) => {
                stop();
                spinner.stop();
                return displayResults(result);
            })
            .catch((err) => {
                spinner.stop();
                return displayError(err);
            });
    });

program.parse(process.argv);

if (process.argv.length !== 4) {
    program.help();
}
