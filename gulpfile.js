var gulp = require('gulp');
var minifycss = require('gulp-clean-css'); // 压缩css
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var rjs = require('gulp-requirejs');  // 合并require开发的js
var amdOptimize = require('gulp-requirejs-optimize');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');  // 压缩js
autoprefixer = require('gulp-autoprefixer'); // 自动加前缀
// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: {baseDir:'./'},
        startPath:'html/index.html'
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("main.scss", ['sass']);
    gulp.watch("js/*.js").on('change', reload);
    gulp.watch("js/main.js").on('change', reload);
    gulp.watch("html/*.html").on('change', reload);
    gulp.watch("html/index.html").on('change', reload);
    gulp.watch("scss/auto.scss").on('change', reload);
    
});

gulp.task('sass',function(){
    return gulp.src('main.scss')
        .pipe(sourcemaps.init())
    	.pipe(scss())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
});

gulp.task('build',['sass'],function(){
    rjs({
        baseUrl:"./",
        name:"lib/almond",
        include:['js/main'],
        out:'bulid.js',
        paths:{
            "jquery":"lib/jquery-3.0.0.min",
            "template":"lib/template-native",
            "fastclick":"lib/fastclick"
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('testAutoFx', function () {
    gulp.src('scss/auto.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0',"ie 8", "ie 7"],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});


