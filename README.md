# [![FuzzyMail](https://github.com/luangjokaj/fuzzymail/raw/master/src/assets/img/logo.svg?sanitize=true)](https://www.fuzzymail.co/)
[![Dependencies](https://david-dm.org/luangjokaj/fuzzymail/status.svg)](https://david-dm.org/luangjokaj/fuzzymail)

[FuzzyMail](https://www.fuzzymail.co/) is Email template generator. Making emails fun again ✌

[![Preview](https://i.imgur.com/VuKitHE.png)](https://www.fuzzymail.co/)
Demo Screenshots: [Modern Client](https://i.imgur.com/ETp8PaX.png) • [Gmail](https://i.imgur.com/kSH90xr.png) • [Outlook](https://i.imgur.com/Wi75S1q.png) • [Mobile](https://i.imgur.com/YJgdCJg.png)

---

**Problem:**
Supporting old email clients it's a real pain. I wanted to create something that can be flexible in design and yet support legacy email clients like Outlook.

---

**Solution:**
**FuzzyMail** - is a simple tool for generating email templates. Supporting old email clients while maintaining responsiveness. Fuzzymail is supported on over 60+ email clients.

---

# Features
|👇|Includes|
|:-:|:---|
|📦| Live Server|
|🔥| Hot Reload & CSS Injection|
|🎒| Code Minification|
|🌈| Image Compression|
|🕸| Templating & Partial HTML Injection|
|🎨| PostCSS & Next Generation CSS|
|🛎| Inline CSS on distribution files|

# Documentation
### Installation
FuzzyMail requires Node v7.5+. This is the only global dependency. You can download Node [**here**](https://nodejs.org/).

## Setup project
### File Structure
```
    ├── build/                   # Build files
    ├── dist/                    # Distribution files
    ├── src/                     # Source files
    │   ├── assets/              # Assets directory
    │       ├── css/             # CSS files
    │       ├── img/             # Image directory
    │   ├── includes/            # HTML template partials
    │   ├── index.html           # Index page
    └── .gitignore               # Git ignored files
    └── gulpfile.js              # Gulp configuration
    └── LICENSE                  # License agreements
    └── package.json             # Node packages
    └── README.md                # You are reading this
```

## Install FuzzyMail from NPM
To install FuzzyMail from NPM, run the command:
```
sudo npm i fuzzymail -g
```

**START FUZZYMAIL**

- Create a directory for the new email template and from there run FuzzyMail to generate the file structure:
```
fuzzymail
```

## Install FuzzyMail from Repository
Clone repository:
```
git clone https://github.com/luangjokaj/fuzzymail
```

- This will clone the repository on your local machine. Navigate to the newly created folder.

- Replace the file: `./package.json` with `./installer/package.json` and continue with the dependency installation.

**INSTALL DEPENDENCIES**

```
npm install
```

**START WORKFLOW**

- We are ready to start our development server with the command:
```
npm run dev
```

### Templating and HTML Partials
To avoid repetitive HTML code, FuzzyMail uses [gulp-file-include](https://github.com/haoxins/gulp-file-include). It has a simple templating synthax and allows to re-use chunks of code written in separate files. These partials are located in the directory:
```
src/includes/
```

For more information check out their documentation and examples: https://github.com/haoxins/gulp-file-include 


### Production
To build the production templates:
```
npm run prod
```

All styles will be inlined, ready to upload the generated ZIP on mailchimp or else 🚀

---

**Credits:**
- HTML Templates http://emailframe.work/

# Changelog
**v0.0.7**
- 📖 DOC: Update README.md.

**v0.0.6**
- 🐛 FIX: Dependencies.

**v0.0.5**
- 🚀 RELEASE: Improved installation speed for global dependencies.
- BREAKING CHANGE: It is required to update FuzzyMail: `sudo npm install fuzzymail -g`.

**v0.0.4**
- 👌 IMPROVE: Meta.

**v0.0.3**
- 📖 DOC: Update documentation.

**v0.0.2**
- 📦 NEW: Run FuzzyMail globally from NPM.

**v0.0.1**
- 🚀 RELEASE: First release.
