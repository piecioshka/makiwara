'use strict';

function collapseArray(array) {
    const hashMap = array.reduce((mem, item) => {
        if (!mem[item]) {
            mem[item] = 0;
        }
        mem[item]++;
        return mem;
    }, {});

    const entries = Object.entries(hashMap);

    entries.forEach((entry) => {
        entry[0] = Number(entry[0]);
    });

    return entries;
}

module.exports = {
    collapseArray
};
