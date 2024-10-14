function collapseArray(array) {
    const hashMap = array.reduce((mem, item) => {
        if (!mem[item]) {
            mem[item] = 0;
        }
        mem[item]++;
        return mem;
    }, {});

    const entries = Object.entries(hashMap);

    return entries.map((entry) => Number(entry[0]));
}

module.exports = {
    collapseArray,
};
