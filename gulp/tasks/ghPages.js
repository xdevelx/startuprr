import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import moment from 'moment';

export default function githubPages() {
  const buildDate = moment().format('YYYY-MM-DD H:mm');
  
  return gulp.src('./build/**/*')
    .pipe(ghPages({'force': true, 'message': 'Build ' + buildDate}));  
}