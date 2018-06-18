import gulp from 'gulp';
import styles from './gulp/tasks/styles';
import scripts from './gulp/tasks/scripts';
import nunjucks from './gulp/tasks/nunjucks';
import clean from './gulp/tasks/clean';
import clearCache from './gulp/tasks/clearCache';
import fonts from './gulp/tasks/fonts';
import images from './gulp/tasks/images';
import pngSprite from './gulp/tasks/pngSprite';
import { svgSymbols, svgSprite } from './gulp/tasks/svgSprite';
import githubPages from './gulp/tasks/ghPages';
import { server } from './gulp/tasks/browserSync';

export { styles, scripts, nunjucks, clean, clearCache, fonts, server, images, svgSymbols, svgSprite, pngSprite};

export const build = gulp.series(clean, gulp.parallel(scripts, styles, fonts, images, svgSymbols, svgSprite, pngSprite), nunjucks);
export const deploy = gulp.series(build, githubPages);
export const dev = gulp.series(build, server);

// Export a default task
export default dev;
