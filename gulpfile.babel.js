'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import path from 'path';
import webpack from 'webpack';

const isDev = process.env.NODE_ENV === "development";

gulp.task('styles', () => {
    return gulp.src(['client/app/styles/main.scss', 'client/admin/styles/admin-main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('static', () => {
    return gulp.src(['client/**/*.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack', (callback) => {
    let webpackOptions = {
        entry:   {
            site: './client/app/index.js',
            admin: './client/admin/app/app.js'
        },
        output:  {
            path: __dirname + '/dist/js',
            filename: '[name].js'
        },
        devtool: isDev ? 'cheap-module-inline-source-map' : null,
        module: {
            loaders: [{
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client')
                ],
                loaders: [ 'react-hot', 'babel?presets[]=stage-0' ]
            }]
        },
        resolve: {
            extentions: [ '', '.js' ]
        },
        watch: isDev,
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    if (!isDev) {
        webpackOptions.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings:     false,
                    unsafe:       true
                }
            })
        );

    }

    webpack(webpackOptions, (err, stats) => {
        if(!webpackOptions.watch && err){
            callback(err);
        }
        else {
            callback();
        }
    });
});

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('watchers', () => {
    gulp.watch('./client/**/*.js', gulp.series('webpack'));
    gulp.watch('./client/**/*.scss', gulp.series('styles'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('static', 'styles', 'webpack')));

gulp.task('dev', gulp.series('build', 'watchers'));