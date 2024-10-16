# makiwara

[![node version](https://img.shields.io/node/v/makiwara.svg)](https://www.npmjs.com/package/makiwara)
[![npm version](https://badge.fury.io/js/makiwara.svg)](https://badge.fury.io/js/makiwara)
[![downloads count](https://img.shields.io/npm/dt/makiwara.svg)](https://www.npmjs.com/package/makiwara)
[![license](https://img.shields.io/npm/l/makiwara.svg)](https://piecioshka.mit-license.org)
[![github-ci](https://github.com/piecioshka/makiwara/actions/workflows/testing.yml/badge.svg)](https://github.com/piecioshka/makiwara/actions/workflows/testing.yml)

🔨 Benchmark URL to gain HTTP requests limits

## Install

```bash
npm install -g makiwara
```

## Usage

```javascript
const { attack } = require('makiwara');

attack('https://example.org', [1, 5, 10], 'sequence')
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## CLI

```text
makiwara --help

Usage: cli [options]

Example:
    makiwara -u https://localhost:3000 -t 10 -s sequence

Options:
  -V, --version                         output the version number
  -u, --url <url>                       Define URL to attack. Ex. https://example.org/
  -t, --timelimit [numbers]             Define list of time thresholds (in seconds). Ex. 10,100,1000
  -s, --strategy <concurrent|sequence>  Define strategy for making requests
  -h, --help                            output usage information
```

## Example

```bash
makiwara -u https://example.org -t 1,5 -s sequence
```

Result:

```text

╔════════════════════════╤════════════════════════════════╗
║ HTTP Status Code       │ Requests quantity              ║
╟────────────────────────┼────────────────────────────────╢
║ 200 OK                 │ 3                              ║
╚════════════════════════╧════════════════════════════════╝

╔════════════════════════╤════════════════════════════════╗
║ Type                   │ Sequence                       ║
╟────────────────────────┼────────────────────────────────╢
║ Effective Duration     │ 1.456 seconds                  ║
╟────────────────────────┼────────────────────────────────╢
║ Times                  │ 3                              ║
╚════════════════════════╧════════════════════════════════╝

----------------------------------------------------

╔════════════════════════╤════════════════════════════════╗
║ HTTP Status Code       │ Requests quantity              ║
╟────────────────────────┼────────────────────────────────╢
║ 200 OK                 │ 10                             ║
╚════════════════════════╧════════════════════════════════╝

╔════════════════════════╤════════════════════════════════╗
║ Type                   │ Sequence                       ║
╟────────────────────────┼────────────────────────────────╢
║ Effective Duration     │ 5.399 seconds                  ║
╟────────────────────────┼────────────────────────────────╢
║ Times                  │ 10                             ║
╚════════════════════════╧════════════════════════════════╝
```

## Unit tests

```bash
npm test
```

## Code coverage

```bash
npm run coverage
```

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2017-2019
