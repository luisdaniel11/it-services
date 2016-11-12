let its = 'it-services';
const paths = {
    commonUI: '../group-common-ui/source/sass',
    src: {
        js: ['source/**/*.js'],
        sass: 'source/**/style/*.scss',
        statics: [
            'source/**/images/*.*',
            'source/**/css/*.*',
            'source/**/fonts/**/*.*',
            'source/**/i18n/*.*',
            'source/*/*.html'
        ],
        testJs: 'test/unit/**/*.js',
        server: 'source/server',

        //IT services (its)
        np: {
            js: [`source/${its}/**/*.js`],
            sass: `source/${its}/style/*.scss`,
            html: `source/${its}/*.html`,
            i18n: `source/${its}/i18n/*.*`,
            images: `source/${its}/images/*.*`,
            testJs: `test/unit/${its}/**/*.js`
        }
    },
    dist: {
        js: 'dist/',
        sass: 'dist/',
        images: 'dist/',
        i18n: 'dist/',
        html: 'dist/',
        statics: 'dist/',
        testJs: 'test/build/',
        server: 'dist/server/',
        lib: "dist/lib",

        np: {
            js: `dist/${its}/`,
            sass: `dist/${its}/style/`,
            html: `dist/${its}/`,
            i18n: `dist/${its}/i18n`,
            images: `dist/${its}/images`,
            testJs: `test/build/${its}/`
        }

    }
};

export default paths;