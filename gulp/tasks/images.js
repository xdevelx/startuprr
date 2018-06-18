import gulp from 'gulp';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import zopfli from 'imagemin-zopfli';
import paths from '../config';

// Images optimization
export default function images() {
  return gulp.src(paths.images.src)
    .pipe(cache(imagemin([
      // imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '60', speed: 5}),
      // zopfli({more: true}),
      mozjpeg({quality: 90}),
      imagemin.svgo(),
      imagemin.gifsicle({interlaced: true})
    ], {verbose: true}
    )))
    .pipe(gulp.dest(paths.images.dest));
}