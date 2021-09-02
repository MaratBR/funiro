const {
  src,
  dest
} = require('gulp');
const include = require('gulp-file-include');
const bs = require('browser-sync');
const webphtml = require('gulp-webp-html');

module.exports = function html() {
  return src(['src/**/*.html', '!src/components/**/*.html'])
    .pipe(include())
    .pipe(webphtml())
    .pipe(dest('build'))
    .pipe(bs.stream())
}