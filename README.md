# FuzzyMail [![Dependencies](https://david-dm.org/luangjokaj/fuzzymail/status.svg)](https://david-dm.org/luangjokaj/fuzzymail)
Making emails fun again ✌

[![Preview](https://i.imgur.com/VuKitHE.png)](https://www.fuzzymail.co/)
Demo Screenshots: [Modern Client](https://i.imgur.com/ETp8PaX.png) • [Gmail](https://i.imgur.com/kSH90xr.png) • [Outlook](https://i.imgur.com/54nsOvO.png) • [Mobile](https://i.imgur.com/YJgdCJg.png)

---

**Problem:**
Supporting old email clients it's a real pain. I wanted to create something that can be flexible in design and yet support legacy email clients like Outlook.

---

**Solution:**
**FuzzyMail** - is a simple tool to automate the development process for creating email templates. Supporting old email clients while maintaining responsiveness. Fuzzymail is supported on over 60+ email clients.

---
# Features
- Dev server with live reload
- PostCSS with `postcss-preset-env`
- Reusable chunks for HTML templating
- Inline CSS on distribution files

# Documentation
### Installation
FuzzyMail requires Node v7.5+. This is the only global dependency. You can download Node [**here**](https://nodejs.org/).

### Setup project
Clone repository:
```
git clone https://github.com/luangjokaj/fuzzymail & cd fuzzymail
```
    
    ├── build/                   # Build files
    ├── dist/                    # Distribution files
    ├── src/                     # Template files
    │   ├── assets/              # Assets directory
    │       ├── css/             # CSS files
    │       ├── img/             # Image directory
    │   ├── includes/            # Template partials
    └── .gitignore               # Git ignored files
    └── CODE_OF_CONDUCT.md       # Code of conduct
    └── gulpfile.js              # Gulp configuration
    └── LICENSE                  # License agreements
    └── package.json             # Node packages
    └── README.md                # You are reading this

### Development
Start development server:
```
npm run dev
```

#### Templating ✍️
To avoid repetitive **HTML** code the build uses [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include), it allow us to re-use chunks of code written in separate files. It is recommended to place the included files in the `/src/includes` directory to keep track of changes and live-reload.

### Production
To build the production templates:
```
npm run prod
```
All styles will be inlined.

---

**Credits:**
- HTML Templates http://emailframe.work/
