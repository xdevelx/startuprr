const paths = {
  styles: {
    src: 'src/styles/style.scss',
    dest: 'build/css/',
    watch: 'src/styles/**/*.scss'
  },
  scripts: {
    src: 'src/scripts/main.js',
    dest: 'build/js/',
    watch: 'src/scripts/**/*.js'
  },
  fonts: {
    src: 'src/fonts/**/*.{woff,woff2,ttf,eot}',
    dest: 'build/fonts/'
  },
  views: {
    src: 'src/views/*.njk',
    dest: 'build/',
    watch: 'src/views/**/*.njk',
    inline: 'src/views/inline'
  },
  images: {
    src: 'src/images/*.{png,jpg,jpeg,gif,svg}',
    dest: 'build/images/'
  }
};

export default paths;
