# makiwara ([npm](https://www.npmjs.com/package/makiwara))

[![npm version](https://badge.fury.io/js/makiwara.svg)](https://badge.fury.io/js/makiwara)
![](https://img.shields.io/npm/dt/makiwara.svg)
[![Travis](https://img.shields.io/travis/piecioshka/makiwara.svg?maxAge=2592000)](https://travis-ci.org/piecioshka/makiwara)

> :hammer: Kick off HTTP request attack to URL with summary

## Install

```
$ npm install -g makiwara
```

## Usage

```javascript
const { attack } = require('makiwara');

attack(100, 'http;//example.org')
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
```

## CLI 

```
$ makiwara

  Usage: makiwara [options] <quantity> <url>


  Options:

    -V, --version  output the version number
    -h, --help     output usage information
```

```
$ makiwara 100 http://localhost

Test are started on 2017-12-16T11:56:42.078Z

Results board:

╔══════════════════╤══════════╗
║ HTTP Status Code │ Quantity ║
╟──────────────────┼──────────╢
║ 200 OK           │ 10       ║
╚══════════════════╧══════════╝

 - Average of request time: 255.9 ms

Test are finished on 2017-12-16T11:56:44.656Z

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
