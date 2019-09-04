/**
 * Install WPGulp
 */

const fs = require('fs');
const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];
const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const download = require('download');
const handleError = require('./handleError.js');
const clearConsole = require('./clearConsole.js');
const printNextSteps = require('./printNextSteps.js');

module.exports = () => {
	// Init.
	clearConsole();

	// Files.
	const filesToDownload = [
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/.gitignore',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/LICENSE',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/README.md',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/gulpfile.js',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/installer/package.json',

		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/index.html',

		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/footer.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/header.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/logo.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/single-column.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/socials.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/title.html',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/includes/two-columns.html',

		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/css/email-framework.css',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/css/fuzzy.css',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/css/globals.css',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/css/styles.css',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/css/variables.css',

		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/socialmedia/email.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/socialmedia/facebook.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/socialmedia/instagram.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/socialmedia/linkedin.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/socialmedia/twitter.png',

		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/header.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/logo.png',
		'https://raw.githubusercontent.com/luangjokaj/fuzzymail/v0.0.8/src/assets/img/logo.svg',
	];

	// Organise file structure
	const dotFiles = ['.gitignore'];
	const srcFiles = ['index.html'];
	const includesFiles = [
		'footer.html',
		'header.html',
		'logo.html',
		'single-column.html',
		'socials.html',
		'title.html',
		'two-columns.html',
	];
	const cssFiles = [
		'email-framework.css',
		'fuzzy.css',
		'globals.css',
		'styles.css',
		'variables.css',
	];
	const socialImgFiles = [
		'email.png',
		'facebook.png',
		'instagram.png',
		'linkedin.png',
		'twitter.png',
	];
	const imgFiles = ['header.png', 'logo.png', 'logo.svg'];

	// Start.
	console.log('\n');
	console.log(
		'📦 ',
		chalk.black.bgYellow(` Downloading 📨 FuzzyMail files in: → ${chalk.bgGreen(` ${theDir} `)}\n`),
		chalk.dim(`\n In the directory: ${theCWD}\n`),
		chalk.dim('This might take a couple of minutes.\n'),
	);

	const spinner = ora({ text: '' });
	spinner.start(`1. Creating 📨 FuzzyMail files inside → ${chalk.black.bgWhite(` ${theDir} `)}`);

	// Download.
	Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
		if (!fs.existsSync('src')) {
			await execa('mkdir', [
				'src',
				'src/includes',
				'src/assets',
				'src/assets/css',
				'src/assets/img',
				'src/assets/img/socialmedia',
			]);
		}

		dotFiles.map(x =>
			fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err => handleError(err)),
		);
		srcFiles.map(x => fs.rename(`${theCWD}/${x}`, `${theCWD}/src/${x}`, err => handleError(err)));
		includesFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/includes/${x}`, err => handleError(err)),
		);
		cssFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/css/${x}`, err => handleError(err)),
		);
		socialImgFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/img/socialmedia/${x}`, err => handleError(err)),
		);
		imgFiles.map(x =>
			fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/img/${x}`, err => handleError(err)),
		);
		spinner.succeed();

		// The npm install.
		spinner.start('2. Installing npm packages...');
		// await execa('npm', ['install', '--silent']);
		await execa('npm', ['install']);
		spinner.succeed();

		// Done.
		printNextSteps();
	});
};
