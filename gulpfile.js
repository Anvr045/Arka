const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()
const concat = require('gulp-concat')


// async function html() {
//   src('src/**.html')
//   .pipe(include({
//     prefix:'@@'
//   }))
//   .pipe(dest('dist'))
// }

function scss() {
  return src('src/scss/**.scss')
  .pipe(sass())
  //  .pipe(autoprefixer({
    //  browser: ['last 2 versions']
  //  }))
  .pipe(csso())
  .pipe(concat('index.css'))
  .pipe(dest('public'))

}

function clear () {
  return del(['public/!css', 'public/!img', 'public/!fonts']);
}

async function serve () {
  sync.init({
    server: './public'
  })


  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)

}

exports.build = series(clear, scss,)
exports.serve = series(clear, scss, serve)
exports.clear = clear


