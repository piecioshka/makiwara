# makiwara ([npm](https://www.npmjs.com/package/makiwara))

[![npm version](https://badge.fury.io/js/makiwara.svg)](https://badge.fury.io/js/makiwara)
![](https://img.shields.io/npm/dt/makiwara.svg)
[![Travis](https://img.shields.io/travis/piecioshka/makiwara.svg?maxAge=2592000)](https://travis-ci.org/piecioshka/makiwara)

> :hammer: Test URL to gain HTTP response limits in time thresholds

## Install

```
$ npm install -g makiwara
```

## Usage

```javascript
const { attack } = require('makiwara');

attack('http;//example.org', [1, 5, 10])
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## CLI 

```
$ makiwara --help

  Usage: cli [options]


  Options:

    -V, --version        output the version number
    -u, --url <url>      Define URL to attack
    -t, --times [times]  Define list of time thresholds (in seconds)
    -h, --help           output usage information
```

```
Requests summary of 1 second(s):
╔══════════════════════╤═══════════════════════════╗
║ HTTP Status Code     │ Quantity                  ║
╟──────────────────────┼───────────────────────────╢
║ 200 OK               │ 3                         ║
╚══════════════════════╧═══════════════════════════╝

Attack summary of 1 second(s):
╔══════════════════════╤═══════════════════════════╗
║ Start time           │ 2017-12-18T11:48:37.152Z  ║
╟──────────────────────┼───────────────────────────╢
║ End time             │ 2017-12-18T11:48:38.296Z  ║
╟──────────────────────┼───────────────────────────╢
║ Duration             │ 1144 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Time limit           │ 1000 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Avg. request time    │ 333.333 ms/req.           ║
╚══════════════════════╧═══════════════════════════╝

----------------------------------------------------

Requests summary of 5 second(s):
╔══════════════════════╤═══════════════════════════╗
║ HTTP Status Code     │ Quantity                  ║
╟──────────────────────┼───────────────────────────╢
║ 200 OK               │ 21                        ║
╚══════════════════════╧═══════════════════════════╝

Attack summary of 5 second(s):
╔══════════════════════╤═══════════════════════════╗
║ Start time           │ 2017-12-18T11:48:37.153Z  ║
╟──────────────────────┼───────────────────────────╢
║ End time             │ 2017-12-18T11:48:42.265Z  ║
╟──────────────────────┼───────────────────────────╢
║ Duration             │ 5112 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Time limit           │ 5000 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Avg. request time    │ 238.095 ms/req.           ║
╚══════════════════════╧═══════════════════════════╝

```

## Unit tests

How to run unit test (written in Jasmine):

```
$ npm test
```

## Code coverage

Use Istanbul to get code coverage ratio.

```
$ npm run coverage
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2017
