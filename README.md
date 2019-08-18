# [![GoPablo](src/assets/img/logo.svg)](https://www.fuzzymail.co/)
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

### Setup project
Clone repository:
```
git clone https://github.com/luangjokaj/fuzzymail & cd fuzzymail
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

### Development
Start development server:
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
