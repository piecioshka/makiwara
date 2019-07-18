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
        'max-statements': ['off'],
        'comma-dangle': ['off'],
        'no-console': ['off'],
        'no-magic-numbers': ['off', { "ignore": [0, 1] }],
        'require-jsdoc': ['off'],
        'object-curly-newline': ['off'],
        'no-implicit-globals': ['off'],
        'global-require': ['off']
    },

    // List of global variables.
    globals: {}
};
