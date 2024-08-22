const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const filenames = require('gulp-filenames');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const dist = "./Dist";
const build = (process.argv.findIndex((val) => val === "--dev") != "-1" ? "./build" : "");
gulp.task('server', function () {
    browserSync.init({
        proxy: "http://sber-test",
        host: "http://localhost:3000/"
    });

    gulp.watch("./src/scss/**/*.+(scss|sass)").on("change", gulp.series("styles", browserSync.reload));
    gulp.watch("./src/**/*.+(js|ts|jsx|tsx)").on("change", gulp.series("build-js", browserSync.reload));
    gulp.watch("./src/assets/**/*.*").on("change", gulp.series("copy-assets", browserSync.reload));
    gulp.watch("./dist/**/*.php").on("change", gulp.series(browserSync.reload));
});

gulp.task("build-js", () => {
    return gulp.src("./src/*.+(jsx|tsx|js|ts)")
        .pipe(webpack({
            entry: {
                main: "./src/main.tsx"
            },
            mode: (build !== "" ? "production" : 'development'),
            output: {
                filename: '[name].js',
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            },
            watch: false,
            devtool: (build !== "" ? false : 'source-map'),
            module: {
                rules: [
                    {
                        test: /\.(js|ts)x?$/,
                        exclude: /(node_modules|bower_components)/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        ['@babel/preset-env', {
                                            debug: (build !== "" ? false : true),
                                            corejs: 3,
                                            useBuiltIns: "usage"
                                        }],
                                        '@babel/preset-react',
                                        '@babel/preset-typescript'
                                    ]
                                },
                            },
                        ],
                    }
                ],
            },
        }))
        .pipe(gulp.dest((build !== "" ? build : dist) + "/js"))
        .pipe(browserSync.stream());
});

gulp.task("copy-html", ()=>{
    return gulp.src("./src/*.+(html|php)")
        .pipe(gulp.dest(dist + "/"))
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return gulp.src("./src/scss/style.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest((build !== "" ? build : dist) + "/css"))
        .pipe(browserSync.stream());
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
        .pipe(gulp.dest((build !== "" ? build : dist) + "/assets"));
});

gulp.task("default", gulp.parallel(
    "build-js",
    "styles",
    "copy-assets",
    "copy-html",
    "server"
));
