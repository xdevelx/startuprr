import gulp from 'gulp';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import webpack from 'webpack-stream';
import rev from 'gulp-rev';
import paths from '../config';

export default function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(webpack({
      //watch: true,
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [{
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }]
      }
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.scripts.dest));
}
