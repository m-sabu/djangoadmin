var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    less            = require('gulp-less'),
    minifyCSS       = require('gulp-minify-css'),
    templateCache   = require('gulp-angular-templatecache'),
    sourcemaps      = require('gulp-sourcemaps'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    ngAnnotate      = require('gulp-ng-annotate'),
    fs              = require('fs'),
    jshint          = require('gulp-jshint'),
    awspublish      = require('gulp-awspublish');


var project = 'novalytics';

// browser-sync task for starting the server.
gulp.task('browser-sync', ['less', 'templates', 'js'], function() {
    browserSync({
        port: 8777,
        proxy: '127.0.0.1:8999',
        open: false
    });
});

gulp.task('js-reload', ['js'], function() {
    reload
});

gulp.task('less-reload', ['less'], function() {
    reload
});

// use default task to launch BrowserSync and watch JS files
gulp.task('default',['js','less'], function () {
    browserSync({
        notify:false,
        port: 8777,
        proxy: '127.0.0.1:8999',
        open: false
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(["client/templates/**/*.html"], ['js-reload']);
    gulp.watch(["client/app/**/*.js"], ['js-reload']);
    gulp.watch(["client/styles/less/**/*.less"], ['less-reload']);
});

// Compile less
gulp.task('less', function(){
    return gulp.src(['client/styles/less/bootstrap.less'])
        .pipe(less())
        //.pipe(minifyCSS({}))
        .pipe(gulp.dest('./assets/css'))
        .pipe(reload({stream:true}));
});


// Create a $templateCache file
gulp.task('templates', function(){
    return gulp.src('./client/templates/**/*.html')
        .pipe(templateCache({module: project}))
        .pipe(gulp.dest('client/tmp'))
        .pipe(reload({stream:true}));
});


var includes = [
    // Load angular first
    'bower_components/angular/angular.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-animate/angular-animate.js',
    // Load 3rd party libs, preferably in the order that they are stated in main.js
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-translate/angular-translate.js',
    'client/libs/angular-translate/angular-translate-loader-static-files.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/angular-lodash/angular-lodash.js',
    'bower_components/moment/moment.js',
    'bower_components/moment/locale/sv.js',
    'bower_components/angular-moment/angular-moment.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/restangular/dist/restangular.js',
    'bower_components/angular-ui-select/dist/select.js',
    'client/libs/highcharts/highstock-custom.js',
    'bower_components/sweetalert/dist/sweetalert.min.js',
    'bower_components/angular-sweetalert/SweetAlert.min.js',
    // Load main.js, config.js and then app related scripts
    'client/app/main.js',
    'client/app/config.js',
    'client/app/run.js',
    // The template files are concatenated into templatecache
    // Load templates preferrably before referring to them
    'client/tmp/templates.js',
    'client/app/routes.js',
    'client/app/scripts/**/*.js'
];


gulp.task('copy-assets', [], function(){
    return gulp.src(['./client/assets/**'])
        .pipe(gulp.dest('./assets'));
});


// Build app without minification
gulp.task('js', ['templates'], function () {
    return gulp.src(includes)
        //.pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/js'))
        .pipe(reload({stream:true}));
});


gulp.task('jshint', function(){
    gulp.src('client/app/src/**/*.js').
        pipe(jshint()).
        pipe(jshint.reporter('default'))
});


// Build and minify the js app
gulp.task('jsmin', ['templates'], function () {
    gulp.src(includes).
        pipe(ngAnnotate()).
        pipe(concat('app.min.js')).
        pipe(uglify()).
        pipe(gulp.dest('./www/js'))
});


// Watch file changes
gulp.task('watch', ['less', 'templates', 'js', 'copy-assets'], function () {
    gulp.watch('client/styles/less/**/*.less', ['less']);
    gulp.watch('client/templates/**/*.html', ['js']);
    gulp.watch('client/app/**/*.js', ['js']);
});


// Deploy to S3 test bucket
gulp.task('deploy', ['less', 'templates', 'jsmin'], function () {
    var aws = JSON.parse(fs.readFileSync('./aws.json'));
    var publisher = awspublish.create(aws);
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };
    return gulp.src('./www/**').
        pipe(publisher.publish(headers)).
        pipe(publisher.cache()).
        pipe(awspublish.reporter());
});


// Deploy to S3 staging bucket
gulp.task('deploy-staging', ['less', 'templates', 'jsmin'], function () {
    var aws = JSON.parse(fs.readFileSync('./aws-staging.json'));
    var publisher = awspublish.create(aws);
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };
    return gulp.src('./www/**').
        pipe(awspublish.gzip()).
        pipe(publisher.publish(headers)).
        pipe(publisher.cache()).
        pipe(awspublish.reporter());
});


// Deploy to S3 live/prod bucket
gulp.task('deploy-live', ['less', 'templates', 'jsmin'], function () {
    var aws = JSON.parse(fs.readFileSync('./aws-live.json'));
    var publisher = awspublish.create(aws);
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public'
    };
    return gulp.src('./www/**').
        pipe(awspublish.gzip()).
        pipe(publisher.publish(headers)).
        pipe(publisher.cache()).
        pipe(awspublish.reporter());
});