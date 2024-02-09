const { src, dest, watch, series, parallel } = require('gulp');
// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');//ayuda a encontrar el css en los archivos scss para modificarlos
const cssnano = require('cssnano');//ayuda a minimizar el tamanio del css, el archivo es dificil de leer por lo que hay que tener sourcemaps antes de usar cssnano


// Imagenes
 const imagemin = require('gulp-imagemin');
 const webp = require('gulp-webp');
 const avif = require('gulp-avif');
// import imagemin from 'gulp-imagemin';

function css( done ) {
    //sass compile
    //step 1: indentificar archivo
    //step 2: compilarla
    //step 3: guardar el css
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano() ]))
        .pipe (sourcemaps.write('.'))
        .pipe( dest('build/css') );

        done();
}
function imagenes(  ) {
    return src ('src/img/**/*')
        .pipe( imagemin( {optimizationLevel: 3} ) )
        .pipe ( dest ('build/img') );
}
function imgWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
            .pipe( webp( opciones ) )
            .pipe( dest('build/img') );
}
function imgAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest( 'build/img' ));
}

function dev( ) {
    watch( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', imagenes);
}


exports.css      = css;
exports.dev      = dev;
exports.imagenes = imagenes;
exports.imgWebp  = imgWebp;
exports.imgAvif  = imgAvif;
exports.default  = series(imagenes,imgWebp, imgAvif, css, dev);
//series - se inicia una tarea y hasta que finaliza inicia la siguiente
//parallel- todas inician al mismo tiempo
