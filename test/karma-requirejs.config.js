require.config({

    // karma serves files from '/base'
    baseUrl: '/base',

    // dependecies paths definition
    paths: {
        'babelHelpers': 'lib/babel-helpers',
        'angular': 'node_modules/angular/angular',
        'angularMocks': 'node_modules/angular-mocks/angular-mocks'
    },

    // load no AMD modules
    shim: {
        babelHelpers: { exports: 'babelHelpers' },
        angular: { exports: 'angular' },
        angularMocks: { deps: ['angular'] }
    },

    // load all testing dependecies
    deps: ["babelHelpers", "angular", "angularMocks"],

    callback: function (babelHelpers) {
        window.babelHelpers = babelHelpers;
        // Matching test files
        var unitTestFiles = [];

        for (var file in window.__karma__.files) {
            if (/^\/base\/test\//.test(file) && /\.spec\.js$/.test(file)) {
                unitTestFiles.push(file);
            }
        }

        console.log(unitTestFiles.length, ' matched test files ', unitTestFiles);

        // Starting Karma test run
        console.log('Running karma tests');
        require(unitTestFiles, window.__karma__.start);
    }

});
