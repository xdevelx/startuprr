import gulp from 'gulp';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import sprite from 'gulp-svg-sprite';
import paths from '../config';


function svgSymbols() {
  return gulp.src('src/images/svg-symbol-icons/*.svg')
    .pipe(plumber())
    //.pipe(imagemin([imagemin.svgo()]))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').not('[fill="currentColor"]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[data-original]').removeAttr('data-original');
        $('[data-old_color]').removeAttr('data-old_color');
        $('style').remove();
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(sprite({
      mode: {
        symbol: {
          inline: true,
          sprite: '../symbols.svg',
        }
      }
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(gulp.dest(paths.views.inline));  
}

function svgSprite() {
  return gulp.src('src/images/svg-sprite-icons/*.svg')
      .pipe(plumber())
      .pipe(imagemin([imagemin.svgo()]))
      .pipe(sprite({
        mode: {
          css: {
            bust: false,
            sprite: '../sprite.svg',
            render: {
              scss: {
                dest: '../../../src/styles/_svg.sprite.scss',
                template: 'src/styles/svg-sprite.template.mustache'
              }
            }
          }
        },
        variables: {
          path: '/images/sprite.svg'
        }
      }))
      .pipe(gulp.dest(paths.images.dest));
}

export { svgSymbols, svgSprite };

