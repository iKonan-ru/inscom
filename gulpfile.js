let gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    csso = require('gulp-csso'),
    twig = require('gulp-twig'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    replace = require('gulp-replace');

let runTimestamp = Math.round(Date.now()/1000);
let fontName = 'Icons';

// Сборка иконочного шрифта
gulp.task('iconfont', () => {
    gulp.src(['./styles/_icons/glyphs/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: './styles/_icons/_icons__template',
            targetPath: '../../../../styles/_icons/_icons__constants.less',
            fontPath: 'assets/fonts/' + fontName + '/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            normalize: true,
            fontHeight: 1001,
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: runTimestamp
        }))
        .pipe(gulp.dest('./build/assets/fonts/' + fontName + '/'));
});

// Копируем ассеты
gulp.task('assets', () => {
    gulp.src(['./assets/**/*'])
        .pipe(gulp.dest('./build/assets'));
});

// Исправляем пути на ассеты в стилях и шаблонах
gulp.task('assets-url', () => {
    gulp.src(['main.css'])
        .pipe(replace('../../assets/', ''))
        .pipe(gulp.dest('build/assets'));
    gulp.src(['*.html'])
        .pipe(replace('../../assets/', ''))
        .pipe(gulp.dest('assets/'));
});

// Сборка стилей
gulp.task('styles', () => {
    return gulp.src('./styles/main.less')
        .pipe(plumber())
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(autoprefixer({
            browsers: [
                'Explorer >= 8',
                'Edge >= 12',
                'Opera >= 10.7',
                'Firefox >= 3.5',
                'Chrome >= 20',
                'Safari >= 5',
                'Android >= 4',
                'iOS >= 7'
            ],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./build/assets/'));
});

// Поднимаем сервер
gulp.task('server', () => {
    return browserSync.init({
        server: {
            baseDir: "./build"
        },
        open: false
    });
});

// Собираем .twig шаблоны
gulp.task('templates', () => {
    return gulp.src('./templates/*.twig')
        .pipe(twig({
            useFileContents: true,
            functions: [
                {
                    name: "bem",
                    func: function (blockName, className = null) {
                        if (className) {
                            const result = [];
                            if (Array.isArray(className)) {
                                result.push(blockName);
                                className.forEach((item) => {
                                    if (item !== '') {
                                        result.push(blockName + '_' + item);
                                    }
                                });
                            } else {
                                result.push(blockName + '__' + className);
                            }
                            return result.join(' ');
                        } else {
                            return blockName;
                        }
                    }
                }
            ]
        }))
        .pipe(gulp.dest('./build/'));
});

// Очищаем папку build
gulp.task('clean', () => {
    return del('build/**/*');
});

gulp.task('watch', () => {
    gulp.watch(['./styles/**/*'], () => {gulpSequence('styles', 'assets-url', 'server:reload')()});
    gulp.watch(['./assets/**/*'], () => {gulpSequence('assets', 'server:reload')()});
    gulp.watch(['./templates/**/*'], () => {gulpSequence('templates', 'assets-url', 'server:reload')()});
});

// Перезагружаем страницу
gulp.task('server:reload', (done) => {
    browserSync.reload();
    done();
});

// Сборка проекта
gulp.task('build', gulpSequence('clean', 'iconfont', 'assets', ['styles', 'templates'], 'assets-url'));

// Режим разработки
gulp.task('dev', gulpSequence('build', 'server', 'watch'));

gulp.task('default', ['dev']);
