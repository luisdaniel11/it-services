function translateConfig($translateProvider, config) {
    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: config.i18n + 'itServices-',
            suffix: '.json'
        }]
    });
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
}

translateConfig.$inject = ["$translateProvider", "serviceConfig"];
export default translateConfig;