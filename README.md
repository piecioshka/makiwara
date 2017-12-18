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
$ makiwara --url http://example.org --times 1,5
Requests summary:
╔══════════════════════╤═══════════════════════════╗
║ HTTP Status Code     │ Quantity                  ║
╟──────────────────────┼───────────────────────────╢
║ 200 OK               │ 4                         ║
╚══════════════════════╧═══════════════════════════╝

Attack summary:
╔══════════════════════╤═══════════════════════════╗
║ Start time           │ 2017-12-18T11:21:16.203Z  ║
╟──────────────────────┼───────────────────────────╢
║ End time             │ 2017-12-18T11:21:17.344Z  ║
╟──────────────────────┼───────────────────────────╢
║ Duration             │ 1141 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Time limit           │ 1000 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Avg. request time    │ 250.000 ms/req.           ║
╚══════════════════════╧═══════════════════════════╝

---------------------------------------------------

Requests summary:
╔══════════════════════╤═══════════════════════════╗
║ HTTP Status Code     │ Quantity                  ║
╟──────────────────────┼───────────────────────────╢
║ 200 OK               │ 22                        ║
╚══════════════════════╧═══════════════════════════╝

Attack summary:
╔══════════════════════╤═══════════════════════════╗
║ Start time           │ 2017-12-18T11:21:16.203Z  ║
╟──────────────────────┼───────────────────────────╢
║ End time             │ 2017-12-18T11:21:21.328Z  ║
╟──────────────────────┼───────────────────────────╢
║ Duration             │ 5125 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Time limit           │ 5000 ms                   ║
╟──────────────────────┼───────────────────────────╢
║ Avg. request time    │ 227.273 ms/req.           ║
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
