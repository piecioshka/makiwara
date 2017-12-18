module.exports = {
    extends: 'piecioshka',

    parserOptions: {
        ecmaVersion: 2017
    },

    // http://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        es6: true,
        // browser: true,
        node: true,
        commonjs: true,
        // amd: true,
        // jquery: true,
        jasmine: true
    },

    // http://eslint.org/docs/rules/
    rules: {
        'no-implicit-globals': ['off'],
        'global-require': ['off']
    },

    // List of global variables.
    globals: {}
};
