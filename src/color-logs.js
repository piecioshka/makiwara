function setupColorLog(name) {
    const fn = require(`ansi-${name}`);
    console[name] = (...args) => console.log(...args.map(fn));
}

setupColorLog('red');
setupColorLog('yellow');
setupColorLog('gray');
setupColorLog('cyan');
