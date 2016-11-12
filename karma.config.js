var babelConfig = require('./babel.config.json');
var extend = require('extend');
var isparta = require('isparta');

// Karma configuration
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use ->99 available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        // list of files to load in the browser
        files: [
            { pattern: 'node_modules/**/*.js', included: false, watched: false },
            { pattern: 'lib/**/*.js', included: false, watched: false },
            { pattern: 'test/unit/**/*.js', included: false },
            { pattern: 'source/**/*.js', included: false },
            { pattern: 'test/karma-requirejs.config.js' }
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser -> available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'source/**/*.js': ['coverage', 'babel'],
            'test/unit/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: extend(babelConfig, { sourceMap: 'inline' })
        },

        // test results reporters to use -> available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'spec', 'coverage'],

        specReporter: {
            maxLogLines: 5,                 // limit number of lines logged per test
            showSpecTiming: true            // print the time elapsed for each spec
        },

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/',
            instrumenters: {
                isparta: isparta
            },
            instrumenter: {
                '**/*.js': 'isparta'
            }
        },

        // web server port
        port: 9876,

        // level of logging -> possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers -> available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'IE', 'PhantomJS'],

        // Continuous Integration mode -> if true, Karma captures browsers, runs the tests and exits
        singleRun: true

    });
};
