import gulp from 'gulp';
import merge from 'merge-stream';
import buffer from 'vinyl-buffer';
import spriteSmith from 'gulp.spritesmith';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import paths from '../config';

export default function pngSprite() {
  // Generate spritesheet
  var spriteData = gulp.src('src/images/png-icons/*.png').pipe(spriteSmith({
    imgName: 'sprite.png',
    cssName: '_png.sprite.scss',
    cssTemplate: 'src/styles/png-sprite.template.mustache',
    imgPath: '/images/sprite.png' 
  }));
 
  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin(cache(imagemin([
      pngquant({quality: '60', speed: 5}),
    ], {verbose: true}
    ))))
    .pipe(gulp.dest(paths.images.dest));
 
  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('src/styles'));
 
  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
}