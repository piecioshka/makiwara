# makiwara

[![npm version](https://badge.fury.io/js/makiwara.svg)](https://badge.fury.io/js/makiwara)
[![downloads count](https://img.shields.io/npm/dt/makiwara.svg)](https://www.npmjs.com/~piecioshka)
[![travis-ci](https://api.travis-ci.com/piecioshka/makiwara.svg?branch=master)](https://app.travis-ci.com/github/piecioshka/makiwara)
[![coveralls](https://coveralls.io/repos/github/piecioshka/makiwara/badge.svg?branch=master)](https://coveralls.io/github/piecioshka/makiwara?branch=master)

:hammer: Benchmark URL to gain HTTP requests limits

## Install

```bash
npm install -g makiwara
```

## Usage

```javascript
const { attack } = require('makiwara');

attack('http://example.org', [1, 5, 10], 'sequence')
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
    makiwara -u http://localhost:3000 -t 10 -s sequence

Options:
  -V, --version                         output the version number
  -u, --url <url>                       Define URL to attack. Ex. http://example.org/
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

[The MIT License](http://piecioshka.mit-license.org) @ 2017-2019
