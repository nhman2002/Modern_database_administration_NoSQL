const { src, dest, watch, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
// npm install --save-dev gulp-imagemin@7.1.0
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: ['sass/pages/*.scss', 'sass/**/*.scss'],
        dest: 'public/styles'
    },
    images: {
        src: 'sass/images/*+(png|jpeg|jpg|gif|svg)',
        dest: 'public/images'
    },
    views: {
        src: 'public/**/*.html'
    },
    scripts: {
        src: ['public/scripts/**/*.js', 'public/vendors/**/*.js']
    },
    browserSync: {
        baseDir: "public",
    },
}

function clean() {
    return del();
}

function browserSyncInit(done) {
    return browserSync.init({
        files: ['public/index.html', 'public/views/schedule.html', 'public/views/bookingStep1.html', 'public/views/bookingStep2.html', 'public/views/bookingStep2_confirm.html', 'public/views/bookingStep3.html', 'public/views/bookingStep4.html', 'public/views/dashboard.html'],
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
    done();
}

function styles() {
    return src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
}

function images() {
    return src(paths.images.src)
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.reload({
            stream: true
        }))
}

function watchFiles() {
    styles();
    images();
    browserSyncInit();
    watch(paths.styles.src, styles);
    watch(paths.images.src, images);
    watch(paths.views.src, { events: 'all' }, function (cb) {
        browserSync.reload();
        cb();
    });
    watch(paths.scripts.src, function (cb) {
        browserSync.reload();
        cb();
    });
}

exports.default = watchFiles;