import gulp from 'gulp';
import browserSync from 'browser-sync';
import styles from './styles';
import scripts from './scripts';
import nunjucks from './nunjucks';
import paths from '../config';

export const bs = browserSync.create();

export function server() {
  bs.init({
    notify: true,
    server: './build'
  });
  
  gulp.watch(paths.styles.watch, gulp.series(styles, nunjucks));
  gulp.watch(paths.scripts.watch, gulp.series(scripts, nunjucks));
  gulp.watch(paths.views.watch, gulp.series(nunjucks));
}
