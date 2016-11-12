import del from "del";

import gulp from "gulp";
import gulp_babel from "gulp-babel";
import gulp_sass from "gulp-sass";
import gutil from "gulp-util";
import gulp_plumber from "gulp-plumber";
import gulp_sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import gulp_webserver from "gulp-webserver";
import eslint from 'gulp-eslint';
import karma from 'karma';

import babelConfig from './babel.config.json';


// Constants
import paths from './paths';

// NODE_ENV variable can be set in command line like following (default value is 'development') :
// set NODE_ENV=prod/test/dev (Windows) | export NODE_ENV=prod/test/dev (Unix)
const nodeEnvironment = process.env.NODE_ENV || 'development';
const productionMode = nodeEnvironment === 'prod' || nodeEnvironment === 'production';
const testingMode = nodeEnvironment === 'test' || nodeEnvironment === 'testing';
const developmentMode = nodeEnvironment === 'dev' || nodeEnvironment === 'development';

/////////////////
//////UTILS//////
/////////////////

let buildJS = (src, dest) => {
    return gulp.src(src)
        .pipe(gulp_plumber(function (error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe((developmentMode) ? eslint() : gutil.noop())
        .pipe((developmentMode) ? eslint.format() : gutil.noop())
        .pipe((developmentMode) ? gulp_sourcemaps.init() : gutil.noop())
        .pipe(gulp_babel(babelConfig))
        .pipe((productionMode) ? uglify({ mangle: true, compress: true }) : gutil.noop())
        .pipe((developmentMode) ? gulp_sourcemaps.write(".") : gutil.noop())
        .pipe(gulp.dest(dest));
};

let buildSass = (src, dest) => {
    return gulp.src(src)
        .pipe(gulp_sass({
            outputStyle: (developmentMode) ? 'expanded' : 'compressed',
            sourceComments: developmentMode,
            includePaths: [
                paths.commonUI
            ]
        }))
        .on('error', gulp_sass.logError)
        .pipe(gulp.dest(dest));
};

let moveStaticFiles = (src, dest) => {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
};

let runTests = () => {

    let karmaOptions = {
        configFile: __dirname + '/karma.config.js',
        //browsers: productionMode ? ['PhantomJS'] : ['Chrome', 'IE', 'PhantomJS'],
        singleRun: !testingMode
    };

    return new Promise((resolve, reject) => {
        let karmaCallback = (exitCode) => exitCode === 0 ? resolve(exitCode) : reject(exitCode);
        return new karma.Server(karmaOptions, karmaCallback).start();
    });
};
/////////////////////
//////END UTILS//////
/////////////////////

gutil.log('Starting Gulp : \n', { nodeEnvironment, productionMode, developmentMode });

gulp.task("clean", () => del.sync(["dist/**", 'test/build/**', 'test/coverage/**']));

gulp.task("js", () => buildJS(paths.src.js, paths.dist.js));

gulp.task('sass', () => buildSass(paths.src.sass, paths.dist.sass));

gulp.task('compile-tests', () => buildJS(paths.src.testJs, paths.dist.testJs));

gulp.task('test', ['clean'], () => runTests());

gulp.task('statics', () => moveStaticFiles(paths.src.statics, paths.dist.statics));

gulp.task('watch-dev', ["default"], () => gulp.watch("source/**/*", ["default"]));

gulp.task("default", ["clean", "js", "sass", "statics"]);

//IT Services(ìts)
gulp.task("ìts:js", () => buildJS(paths.src.ìts.js, paths.dist.ìts.js));
gulp.task('ìts:sass', () => buildSass(paths.src.ìts.sass, paths.dist.ìts.sass));
gulp.task('ìts:html', () => moveStaticFiles(paths.src.ìts.html, paths.dist.ìts.html));
gulp.task('ìts:i18n', () => moveStaticFiles(paths.src.ìts.i18n, paths.dist.ìts.i18n));
gulp.task('ìts:images', () => moveStaticFiles(paths.src.ìts.images, paths.dist.ìts.images));
gulp.task("ìts", ["clean", "ìts:js", "ìts:sass", "ìts:html", "ìts:i18n", "ìts:images"]);


gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(gulp_webserver({
            livereload: false,
            directoryListing: true,
            open: true
        })
    );
});