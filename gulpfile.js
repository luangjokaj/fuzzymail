/* -------------------------------------------------------------------------------------------------

Build Configuration
Contributors: Luan Gjokaj

-------------------------------------------------------------------------------------------------- */
import pkg from 'gulp';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import { deleteAsync } from 'del';
import fileinclude from 'gulp-file-include';
import gutil from 'gulp-util';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import inlineCss from 'gulp-inline-css';
import inline from 'gulp-inline';
import inject from 'gulp-inject-string';
import modRewrite from 'connect-modrewrite';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

const { gulp, series, parallel, dest, src, watch } = pkg;

/* -------------------------------------------------------------------------------------------------
Production URL
-------------------------------------------------------------------------------------------------- */
const productionURL = '.';

//--------------------------------------------------------------------------------------------------
/* -------------------------------------------------------------------------------------------------
PostCSS Plugins
-------------------------------------------------------------------------------------------------- */
const pluginsListDev = [
	postcssImport,
	postcssPresetEnv({
		stage: 0,
		features: {
			'nesting-rules': true,
			'color-function': true,
			'custom-media-queries': true,
		},
	}),
];
const pluginsListProd = [
	postcssImport,
	postcssPresetEnv({
		stage: 0,
		features: {
			'nesting-rules': true,
			'color-function': true,
			'custom-media-queries': true,
		},
		preserve: false,
	}),
	autoprefixer(),
	cssnano(),
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
	watch('./src/includes/*.html', series(stylesDev, staticFilesDev, Reload));
	watch('./src/*.html', series(stylesDev, staticFilesDev, Reload));
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
		.pipe(postcss(pluginsListDev))
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
			})
		)
		.pipe(dest('./build'));
}

const dev = series(copyImagesDev, stylesDev, staticFilesDev, devServer);
dev.displayName = 'dev';
export { dev };

/* -------------------------------------------------------------------------------------------------
Production Tasks
-------------------------------------------------------------------------------------------------- */
async function cleanProd() {
	await deleteAsync(['./dist']);
}

function copyFontsProd() {
	return src('./src/assets/fonts/**').pipe(dest('./dist/assets/fonts'));
}

function stylesProd() {
	return src('./src/assets/css/styles.css')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(postcss(pluginsListProd))
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
			})
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/],
			})
		)
		.pipe(dest('./dist'));
}

function inlineStyles() {
	return src('./dist/*.html')
		.pipe(
			inline({
				base: './dist',
				disabledTypes: ['svg', 'img'],
			})
		)
		.pipe(
			inlineCss({
				applyStyleTags: true,
				removeStyleTags: false,
				removeLinkTags: false,
			})
		)
		.pipe(inject.replace('"./assets', `"${productionURL}/assets`))
		.pipe(dest('./dist'));
}

function processImages() {
	return src('./src/assets/img/**')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(imagemin())
		.pipe(dest('./dist/assets/img'))
		.on('end', () => {
			gutil.beep();
			gutil.log(filesGenerated);
			gutil.log(thankYou);
		});
}

const prod = series(
	cleanProd,
	stylesProd,
	staticFilesProd,
	processImages,
	inlineStyles
);
prod.displayName = 'prod';

export { prod };

/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = (err) => {
	gutil.beep();
	gutil.log(fuzzyMail + ' - ' + errorMsg + ' ' + err.toString());
	this.emit('end');
};

/* -------------------------------------------------------------------------------------------------
Messages
-------------------------------------------------------------------------------------------------- */
const errorMsg = '\x1b[41mError\x1b[0m';
const filesGenerated =
	'Your production file are generated in: \x1b[1m' + '/dist/ ✅';

const fuzzyMail = '\x1b[42m\x1b[1m📨 FuzzyMail\x1b[0m';
const fuzzyMailUrl = '\x1b[2m - https://www.fuzzymail.co/\x1b[0m';
const thankYou = 'Thank you for using ' + fuzzyMail + fuzzyMailUrl;

/* -------------------------------------------------------------------------------------------------
End of all Tasks
-------------------------------------------------------------------------------------------------- */
