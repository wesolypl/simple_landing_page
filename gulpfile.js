const gulp = require("gulp");

const browserSync = require("browser-sync").create();

const sass = require("gulp-sass");

const sourcemaps = require("gulp-sourcemaps");

const autoprefixer = require("gulp-autoprefixer");

const cleanCSS = require("gulp-clean-css");

const uglify = require("gulp-uglify-es").default;

const concat = require("gulp-concat");

const imagemin = require("gulp-imagemin");

const changed = require("gulp-changed");

const htmlReplace = require("gulp-html-replace");

const htmlMin = require("gulp-htmlmin");

const del = require("del");

//ścieżki
const path = {
  dist: "dist/",
  src: "src/",
  cssin: "src/css/**/*.css",
  jsin: "src/js/**/*.js",
  imgin: "src/img/**/*.{png,jpg,jpeg,gif}",
  htmlin: "src/*.html",
  scssin: "src/scss/**/*.scss",
  cssout: "dist/css/",
  jsout: "dist/js/",
  imgout: "dist/img/",
  htmlout: "dist/",
  scssout: "src/css/",
  cssoutname: "style.css",
  jsoutname: "script.js",
  cssreplaceout: "css/style.css",
  jsreplaceout: "js/script.js"
};

//Podgląd i reload przy zmianach w html i scss
gulp.task("reload", function(done) {
  browserSync.reload();
  done();
});

gulp.task("sass", function() {
  return gulp
    .src(path.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.scssout))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: path.src
    }
  });
});

gulp.task("watch", function() {
  gulp.watch(path.scssin, gulp.parallel("sass"));
  gulp.watch([path.htmlin, path.jsin], gulp.parallel("reload"));
});

gulp.task("default", gulp.parallel("watch", "serve", "sass"));

//dystrybucja
gulp.task("css", function() {
  return gulp
    .src(path.cssin)
    .pipe(concat(path.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.cssout));
});

gulp.task("js", function() {
  return gulp
    .src(path.jsin)
    .pipe(concat(path.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(path.jsout));
});

gulp.task("img", function() {
  return gulp
    .src(path.imgin)
    .pipe(changed(path.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(path.imgout));
});

gulp.task("html", function() {
  return gulp
    .src(path.htmlin)
    .pipe(
      htmlReplace({
        css: path.cssreplaceout,
        js: path.jsreplaceout
      })
    )
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true
        // collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(path.dist));
});

gulp.task("clean", function() {
  return del(path.dist);
});

gulp.task("build", function(done) {
  gulp.series("clean", gulp.parallel("html", "js", "css", "img"))(done);
});
