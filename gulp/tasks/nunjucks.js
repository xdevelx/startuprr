import gulp from 'gulp';
import plumber from 'gulp-plumber';
import njk from 'gulp-nunjucks-render';
import data from 'gulp-data';
import htmlmin from 'gulp-htmlmin';
import fs from 'fs';
import { bs } from './browserSync';
import paths from '../config';

export default function nunjucks() {
  return gulp.src(paths.views.src)
    .pipe(plumber())
    .pipe(data(function() {
      return {
        css: JSON.parse(fs.readFileSync('build/css/rev-manifest.json')),
        js: JSON.parse(fs.readFileSync('build/js/rev-manifest.json'))
      };
    }))
    .pipe(njk())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(bs.stream());
}
