let its = 'it-services';
let rt = 'restaurant-ui';
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
        its: {
            js: [`source/${its}/**/*.js`],
            sass: `source/${its}/style/*.scss`,
            html: `source/${its}/*.html`,
            i18n: `source/${its}/i18n/*.*`,
            images: `source/${its}/images/*.*`,
            testJs: `test/unit/${its}/**/*.js`
        },
        //Restaurant (its)
        rt: {
            js: [`source/${rt}/**/*.js`],
            sass: `source/${rt}/style/*.scss`,
            html: `source/${rt}/*.html`,
            i18n: `source/${rt}/i18n/*.*`,
            images: `source/${rt}/images/*.*`,
            testJs: `test/unit/${rt}/**/*.js`
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

        its: {
            js: `dist/${its}/`,
            sass: `dist/${its}/style/`,
            html: `dist/${its}/`,
            i18n: `dist/${its}/i18n`,
            images: `dist/${its}/images`,
            testJs: `test/build/${its}/`
        },
        rt: {
            js: `dist/${rt}/`,
            sass: `dist/${rt}/style/`,
            html: `dist/${rt}/`,
            i18n: `dist/${rt}/i18n`,
            images: `dist/${rt}/images`,
            testJs: `test/build/${rt}/`
        }

    }
};

export default paths;