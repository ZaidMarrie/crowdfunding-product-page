const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// SCSS Task
function scssTask() {
	return src("src/scss/style.scss", { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest("dist", { sourcemaps: "." }));
}

// JS Task
function jsTask() {
	return src("src/js/script.js", { sourcemaps: true })
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(terser())
		.pipe(dest("dist", { sourcemaps: "." }));
}

// Copy Assets
function copyAssets() {
	return src("src/assets/**/*").pipe(dest("dist"));
}

// BrowserSync Tasks
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: ".",
		},
		notify: {
			styles: {
				top: "auto",
				bottom: "0",
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch("**/*.html", browserSyncReload);
	watch("src/assets/**/*", series(copyAssets, browserSyncReload));
	watch(["src/scss/**/*.scss", "src/js/**/*.js"], series(scssTask, jsTask, browserSyncReload));
}

// Build Task
exports.build = series(scssTask, jsTask, copyAssets);

// Default Gulp Task
exports.default = series(scssTask, jsTask, copyAssets, browserSyncServe, watchTask);
