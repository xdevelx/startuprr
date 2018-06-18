import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import rev from 'gulp-rev';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sass from 'gulp-sass';
import csso from 'gulp-csso';
import glob from 'gulp-sass-glob';
import paths from '../config';
import { bs } from './browserSync';

export default function styles() {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
  
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(glob())
    .pipe(sass({includePaths: ['node_modules/']}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']})
    ]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(rev())
    .pipe(gulpIf(isDev, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}
