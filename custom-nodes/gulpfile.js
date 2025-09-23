const gulp = require("gulp");
const del = require("del");

// limpar a pasta dist
gulp.task("clean", () => {
  return del(["dist"]);
});

// copiar o SVG.
const copyIcon = () => {
    return gulp.src('n8n-nodes-random/nodes/Random/icon.svg')
        .pipe(gulp.dest('dist/nodes/Random'));
};

exports.build_icons = gulp.series(copyIcon);