let startTime = null;
let stopTime = null;

function start() {
    startTime = Date.now();
}

function stop() {
    stopTime = Date.now();
}

function getDiffTime() {
    return stopTime - startTime;
}

module.exports = {
    start,
    stop,
    getDiffTime
};
