'use strict';

function setupColorLogFunction(name) {
    const fn = require(`ansi-${name}`);
    console[name] = (...args) => console.log(...args.map(fn));
}

setupColorLogFunction('red');
setupColorLogFunction('yellow');
setupColorLogFunction('gray');
setupColorLogFunction('cyan');

/**
 * @type console
 * @property red
 * @property yellow
 * @property gray
 * @property cyan
 */
