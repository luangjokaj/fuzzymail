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
const version = require('../package.json').version;

module.exports = () => {
	// Init
	clearConsole();

	let upstreamUrl = `https://raw.githubusercontent.com/luangjokaj/fuzzymail/v${version}`;

	// Files
	const filesToDownload = [
		`${upstreamUrl}/.gitignore`,
		`${upstreamUrl}/.editorconfig`,
		`${upstreamUrl}/LICENSE`,
		`${upstreamUrl}/README.md`,
		`${upstreamUrl}/gulpfile.js`,
		`${upstreamUrl}/installer/package.json`,

		`${upstreamUrl}/src/index.html`,

		`${upstreamUrl}/src/includes/footer.html`,
		`${upstreamUrl}/src/includes/header.html`,
		`${upstreamUrl}/src/includes/logo.html`,
		`${upstreamUrl}/src/includes/single-column.html`,
		`${upstreamUrl}/src/includes/socials.html`,
		`${upstreamUrl}/src/includes/title.html`,
		`${upstreamUrl}/src/includes/two-columns.html`,

		`${upstreamUrl}/src/assets/css/email-framework.css`,
		`${upstreamUrl}/src/assets/css/fuzzy.css`,
		`${upstreamUrl}/src/assets/css/globals.css`,
		`${upstreamUrl}/src/assets/css/styles.css`,
		`${upstreamUrl}/src/assets/css/variables.css`,

		`${upstreamUrl}/src/assets/img/socialmedia/email.png`,
		`${upstreamUrl}/src/assets/img/socialmedia/facebook.png`,
		`${upstreamUrl}/src/assets/img/socialmedia/instagram.png`,
		`${upstreamUrl}/src/assets/img/socialmedia/linkedin.png`,
		`${upstreamUrl}/src/assets/img/socialmedia/twitter.png`,

		`${upstreamUrl}/src/assets/img/header.png`,
		`${upstreamUrl}/src/assets/img/logo.png`,
		`${upstreamUrl}/src/assets/img/logo.svg`,
	];

	// Organise file structure
	const dotFiles = ['.gitignore', '.editorconfig'];
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

	// Start
	console.log('\n');
	console.log(
		'📦 ',
		chalk.black.bgYellow(
			` Downloading 📨 FuzzyMail files in: → ${chalk.bgGreen(` ${theDir} `)}\n`
		),
		chalk.dim(`\n In the directory: ${theCWD}\n`),
		chalk.dim('This might take a couple of minutes.\n')
	);

	const spinner = ora({ text: '' });
	spinner.start(
		`1. Creating 📨 FuzzyMail files inside → ${chalk.black.bgWhite(
			` ${theDir} `
		)}`
	);

	// Download
	Promise.all(filesToDownload.map((x) => download(x, `${theCWD}`))).then(
		async () => {
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

			dotFiles.map((x) =>
				fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, (err) =>
					handleError(err)
				)
			);
			srcFiles.map((x) =>
				fs.rename(`${theCWD}/${x}`, `${theCWD}/src/${x}`, (err) => handleError(err))
			);
			includesFiles.map((x) =>
				fs.rename(`${theCWD}/${x}`, `${theCWD}/src/includes/${x}`, (err) =>
					handleError(err)
				)
			);
			cssFiles.map((x) =>
				fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/css/${x}`, (err) =>
					handleError(err)
				)
			);
			socialImgFiles.map((x) =>
				fs.rename(
					`${theCWD}/${x}`,
					`${theCWD}/src/assets/img/socialmedia/${x}`,
					(err) => handleError(err)
				)
			);
			imgFiles.map((x) =>
				fs.rename(`${theCWD}/${x}`, `${theCWD}/src/assets/img/${x}`, (err) =>
					handleError(err)
				)
			);
			spinner.succeed();

			// The npm install
			spinner.start('2. Installing npm packages...');
			await execa('npm', ['install']);
			spinner.succeed();

			// Done
			printNextSteps();
		}
	);
};
