function collapseArray(array) {
    const hashmap = array.reduce((mem, item) => {
        if (!mem[item]) {
            mem[item] = 0;
        }
        mem[item]++;
        return mem;
    }, {});

    const entries = Object.entries(hashmap);

    entries.forEach((entry) => {
        entry[0] = Number(entry[0]);
    });

    return entries;
}

module.exports = {
    collapseArray
};
