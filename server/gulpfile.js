var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

gulp.task("scripts", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task('views', function() {
 return gulp.src('./src/views/**')
 .pipe(gulp.dest('./dist/views/'));
});

gulp.task('assets', function() {
 return gulp.src('./src/public/**')
 .pipe(gulp.dest('./dist/public/'));
});

gulp.task('package.json', function() {
  return gulp.src('./package.json')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch(['src/**/*.ts'], ['scripts']);
  gulp.watch(['src/**/*.json'], ['json']);
  gulp.watch(['src/views/**'], ['views']);
  gulp.watch(['src/public/**'], ['assets'])
});

gulp.task('json', function() {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'json', 'scripts', 'views', 'assets', "package.json"]);
