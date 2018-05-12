let gulp            = require('gulp'),
    scss            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    iconfont        = require('gulp-iconfont'),
    iconfontCss     = require('gulp-iconfont-css');
    sourceMaps      = require('gulp-sourcemaps');


gulp.task('scss', function() {
    return gulp.src('scss/style.scss')
        .pipe(sourceMaps.init())
        .pipe(scss().on( 'error', function( error )
            {console.log( error );} )
        )
        .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8'], {cascade:true}))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false
    });
});

gulp.task('iconfont', function(){
    gulp.src(['svg/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: 'icons',
            path: 'scss/templates/_icons.scss',
            targetPath: '../scss/_icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('fonts/')
        );
});

gulp.task('default', ['browser-sync', 'scss'], function() {
    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('css/**/*.css', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);
});