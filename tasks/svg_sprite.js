const {
  src,
  dest
} = require('gulp');
const svgmin = require('gulp-svgmin');
const sprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

module.exports = function svg_sprite() {
  return src('src/svg/**/*.svg')
    .pipe(sprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('src/img'))
}

// <img src="sprite.svg#myIconFileName">

/* <svg class="img">
    <use xlink:href="sprite.svg#myIconFileName"></use>
</svg> */