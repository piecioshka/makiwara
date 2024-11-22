function setupColorLogFunction(name) {
    const fn = require(`ansi-${name}`);
    return (...args) => console.log(...args.map(fn));
}

module.exports = {
    red: setupColorLogFunction("red"),
    yellow: setupColorLogFunction("yellow"),
    gray: setupColorLogFunction("gray"),
};
