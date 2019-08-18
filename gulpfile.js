/* -------------------------------------------------------------------------------------------------

Build Configuration
Contributors: Luan Gjokaj

-------------------------------------------------------------------------------------------------- */
const { gulp, series, parallel, dest, src, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const fileinclude = require('gulp-file-include');
const gutil = require('gulp-util');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const inlineCss = require('gulp-inline-css');
const modRewrite = require('connect-modrewrite');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const sourcemaps = require('gulp-sourcemaps');

//--------------------------------------------------------------------------------------------------
/* -------------------------------------------------------------------------------------------------
PostCSS Plugins
-------------------------------------------------------------------------------------------------- */
const pluginsDev = [
	postcssImport,
	postcssPresetEnv({
		stage: 0,
		features: {
			'nesting-rules': true,
			'color-mod-function': true,
			'custom-media': true,
		},
	}),
];
const pluginsProd = [
	postcssImport,
	postcssPresetEnv({
		stage: 0,
		features: {
			'nesting-rules': true,
			'color-mod-function': true,
			'custom-media': true,
		},
	}),
	require('cssnano')({
		preset: [
			'default',
			{
				discardComments: true,
			},
		],
	}),
];

//--------------------------------------------------------------------------------------------------
/* -------------------------------------------------------------------------------------------------
Development Tasks
-------------------------------------------------------------------------------------------------- */
function devServer() {
	browserSync.init({
		logPrefix: '📨 FuzzyMail',
		server: {
			baseDir: './build',
		},
		middleware: [modRewrite(['^.([^\\.]+)$ /$1.html [L]'])],
	});

	watch('./src/assets/css/**/*.css', stylesDev);
	watch('./src/assets/img/**', series(copyImagesDev, Reload));
	watch('./src/**/*.html', series(staticFilesDev, Reload));
}

function Reload(done) {
	browserSync.reload();
	done();
}

function copyImagesDev() {
	return src('./src/assets/img/**').pipe(dest('./build/assets/img'));
}

function stylesDev() {
	return src('./src/assets/css/styles.css')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(postcss(pluginsDev))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./build/assets/css'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
}

function staticFilesDev() {
	return src('./src/*.html')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			fileinclude({
				filters: {
					prefix: '@@',
					basepath: '@file',
				},
			}),
		)
		.pipe(dest('./build'));
}

exports.dev = series(copyImagesDev, stylesDev, staticFilesDev, devServer);

/* -------------------------------------------------------------------------------------------------
Production Tasks
-------------------------------------------------------------------------------------------------- */
async function cleanProd() {
	await del(['./dist']);
}

function copyFontsProd() {
	return src('./src/assets/fonts/**').pipe(dest('./dist/assets/fonts'));
}

function stylesProd() {
	return src('./src/assets/css/styles.css')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(postcss(pluginsProd))
		.pipe(dest('./dist/assets/css'));
}

function staticFilesProd() {
	return src('./src/*.html')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			fileinclude({
				filters: {
					prefix: '@@',
					basepath: '@file',
				},
			}),
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/],
			}),
		)
		.pipe(dest('./dist'));
}

function inlineStyles() {
	return src('./dist/*.html')
		.pipe(
			inlineCss({
				applyStyleTags: true,
				removeStyleTags: false,
				removeLinkTags: false,
			}),
		)
		.pipe(dest('./dist'));
}

function processImages() {
	return src('./src/assets/img/**')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			imagemin([imagemin.svgo({ plugins: [{ removeViewBox: true }] })], {
				verbose: true,
			}),
		)
		.pipe(dest('./dist/assets/img'))
		.on('end', () => {
			gutil.beep();
			gutil.log(filesGenerated);
			gutil.log(thankYou);
		});
}

exports.prod = series(cleanProd, stylesProd, staticFilesProd, processImages, inlineStyles);

/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = err => {
	gutil.beep();
	gutil.log(fuzzyMail + ' - ' + errorMsg + ' ' + err.toString());
	this.emit('end');
};

/* -------------------------------------------------------------------------------------------------
Messages
-------------------------------------------------------------------------------------------------- */
const errorMsg = '\x1b[41mError\x1b[0m';
const filesGenerated = 'Your production file are generated in: \x1b[1m' + __dirname + '/dist/ ✅';

const fuzzyMail = '\x1b[42m\x1b[1m📨 FuzzyMail\x1b[0m';
const fuzzyMailUrl = '\x1b[2m - https://www.fuzzymail.co/\x1b[0m';
const thankYou = 'Thank you for using ' + fuzzyMail + fuzzyMailUrl;

/* -------------------------------------------------------------------------------------------------
End of all Tasks
-------------------------------------------------------------------------------------------------- */
