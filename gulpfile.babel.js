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

gulp.task('watch-dev', ["default"], () => gulp.watch("source/**/*", ["js", "sass", "statics"]));

gulp.task("default", ["clean", "js", "sass", "statics"]);

//IT Services(ìts)
gulp.task("its:js", () => buildJS(paths.src.its.js, paths.dist.its.js));
gulp.task('its:sass', () => buildSass(paths.src.its.sass, paths.dist.its.sass));
gulp.task('its:html', () => moveStaticFiles(paths.src.its.html, paths.dist.its.html));
gulp.task('its:i18n', () => moveStaticFiles(paths.src.its.i18n, paths.dist.its.i18n));
gulp.task('its:images', () => moveStaticFiles(paths.src.its.images, paths.dist.its.images));
gulp.task("its", ["clean", "its:js", "its:sass", "its:html", "its:i18n", "its:images"]);

//IT Services(ìts)
gulp.task("rt:js", () => buildJS(paths.src.rt.js, paths.dist.rt.js));
gulp.task('rt:sass', () => buildSass(paths.src.rt.sass, paths.dist.rt.sass));
gulp.task('rt:html', () => moveStaticFiles(paths.src.rt.html, paths.dist.rt.html));
gulp.task('rt:i18n', () => moveStaticFiles(paths.src.rt.i18n, paths.dist.rt.i18n));
gulp.task('rt:images', () => moveStaticFiles(paths.src.rt.images, paths.dist.rt.images));
gulp.task("rt", ["clean", "rt:js", "rt:sass", "rt:html", "rt:i18n", "rt:images"]);


gulp.task('webserver', () => {
    gulp.src('./')
        .pipe(gulp_webserver({
            livereload: false,
            directoryListing: true,
            open: true
        })
    );
});