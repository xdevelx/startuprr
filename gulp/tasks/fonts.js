import gulp from 'gulp';
import paths from '../config';

export default function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}