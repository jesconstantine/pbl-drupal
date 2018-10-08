# The Developers.Akamai.com Styleguide

This repository houses the front-end toolkit for designing in the browser.

## Requirements

### Project

* [Node](https://nodejs.org/en/) >=8.0 <10.0
* [Yarn](https://yarnpkg.com/en/) >= 1.5

We use nvm to manage our node versions. For instructions on getting nvm and yarn installed, refer to the [development documentation](https://github.com/palantirnet/documentation/wiki/Node,-NPM,-and-Yarn).

### Composer

* pattern-lab/core: [documentation](http://patternlab.io/), [Github](https://github.com/pattern-lab/patternlab-php-core), [Packagist](https://packagist.org/packages/pattern-lab/core)
* pattern-lab/patternengine-twig: [documentation](https://github.com/pattern-lab/patternengine-php-twig#twig-patternengine-for-pattern-lab), [Github](https://github.com/pattern-lab/patternengine-php-twig), [Packagist](https://packagist.org/packages/pattern-lab/patternengine-twig)
* pattern-lab/styleguidekit-twig-default: [Github](https://github.com/pattern-lab/styleguidekit-twig-default), [Packagist](https://packagist.org/packages/pattern-lab/styleguidekit-twig-default)


## How to Get Started on your Projects

From the `/styleguide` root:

1. run `composer install`. 
1. run `yarn install`.
1. run `yarn serve`.

## What is the Styleguide?

The styleguide is based on a custom styleguide starterkit created to help standardize and streamline the styleguide creation process. It is
based on the [Patternlab Twig Standard Edition](https://github.com/pattern-lab/edition-php-twig-standard). 

The project uses `yarn` to manage packages and includes a few simple processes that can compile, watch, serve, and deploy your styleguide.

### Sass

#### Imported Helpers

These files are imported via `yarn` to help keep them up to date. These files are imported into the init file.

* [normalize.css](https://necolas.github.io/normalize.css/): Helps browsers render elements more consistently, targetting only the elements that need to be normalized.
* [support-for](https://github.com/JohnAlbin/support-for): Allows Sass authors to conditionally add support for specific browser versions to their Sass module or Sass partials.
* [breakpoint-sass](http://breakpoint-sass.com/): Helps simplify writing breakpoints in sass.

#### Custom Helpers

These files are included in the starterkit and allow you to set custom, project-wide sass. They include:

* `_init.scss`: Initializes your project by setting up all global variables such as font-size variables, font stacks, colors, and breakpoints. This also pulls in the node module sass we are using for breakpoint, normalize, and support-for.
* `_base.scss`: Used to set up base styles for type and links.
* `_animations.scss`: Stores a few basic animations. You should add all custom animations here.
* `_mixins.scss`: Sass mixins.
* `_print.scss`: Basic print styles.
* Vertical Rhythm (library): Vertical rhythm library is a set of mixins that help to manage spacing on the site consistently. This library is based on compass's vertical rhythm. You can learn more about the mixins from the [compass documentation](http://compass-style.org/reference/compass/typography/vertical_rhythm/).

### The Grid (Bootstrap 4.0 Grid syste,)

This project uses [Bootstrap 4.0's grid system base](https://getbootstrap.com/docs/4.0/layout/grid/). 

Our base grid has a max-width of 1600px and is centered in the browser frame. 

### Modernizr

[Modernizr](https://modernizr.com/) detects which features a browser can use and provides helper classes for progressive enhancement. Our base Modernizr file includes:

* Flexbox
  * Includes `.flexbox` and `.no-flexbox`
  * Detects when CSS3 Flexbox model is available, allowing you to use `.no-flexbox` for fallbacks.
* Flexbox Legacy
  * Includes `.flexboxlegacy` and `.no-flexboxlegacy`
  * Detects when [old Flexbox model](https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/) is available, allowing you to use `.no-flexboxlegacy` for fallbacks.
* CSS Animations
  * Includes `.cssanimations` and `.no-cssanimations`
  * These are useful for animation states, especially for animations that need to have a 'forwards' state.
* CSS 3D Transforms
  * Includes `.csstransforms3d` and `.no-csstransforms3d`
  * These are useful for animation states and more complex transitions.

To update your modernizr file to accommodate for additional browser detection visit the website and [creat your own custom build](https://modernizr.com/download?setclasses). Be sure to include the items listed above so that you do not lose any functionality.

### Gulp 

Our gulpfile stores it's settings in the package.json file so that we have a single source. We are using gulp v4.0, which may require you to update or uninstall your local version of gulp if you have one. In order to do that follow these steps:

**Uninstall Global Gulp** (_Recommended_)

In Terminal, check what global packages you have installed with `npm ls -g --depth=0`. You likely have `gulp` and `gulp-cli` installed. We will need to remove both. To do so:

1. `npm uninstall -g gulp`
2. `npm uninstall -g gulp-cli`
3. Check `npm ls -g --depth=0` again to make sure they were removed.

**Update Global Gulp** 

If you have other projects that rely on a global version of gulp, you may want to just update your global version instead. `Gulp` v4.0 is backwards compatible with older versions.

1. `npm uninstall gulp -g`
2. `npm install gulp@next -g`

#### Available Tasks and Functions

We use `yarn` to run our gulp tasks.

##### Tasks
Tasks are the main commands you will run while working on the project.

* `yarn default`: Runs the base project build, with the following functions in a series: `clean`, `image`, `sass`, `libraryScripts`, `customScripts``patternlab`, and `styleguide`.
* `yarn watch`:  watches for changes to twig, json, md, css, imgs, scss, and js and updates as changes are made.
* `yarn serve`: Runs `default`, `browsersync`, and `watch`. This task is used for developing the styleguide locally.
* `yarn deploy`: Runs `default` and `publish` to ensure an up-to-date version of the site is pushed to gh-pages.
* `yarn test`: This script does not exist yet. Has an open issue to create.

##### Functions
Functions are discrete items that are used in the above tasks.

* `clean`: Cleans out `/assets` directory.
* `customScripts`: Looks for scripts in `source/assets/js/site`, concatenates and minifies them.
* `libraryScripts`: Looks for scripts in `source/assets/js/libraries`, concatenates and minifies them.
* `image`: Looks for image files in `source/assets/imgs`, minifies them, and moves them to `/production`.
* `sass`: Looks for scss files throughout the project, creates a sourcemap, compiles into css, autoprefixes, and minifies that css, and moves it to public.
* `patternlab`: Generates patternlab templates and reloads the browser.
* `styleguide`: Moves generated patternlab files into the public directory.
* `reload`: Simple function to initiate browsersync.
* `serve`: Reloads the browser with browsersync.
* `publish`: Pushes the public directory to gh-pages.
* `release`: Creates a tag for a release, pushes that release to github.

#### Modules
Included gulp modules are:

* [gulp](https://www.npmjs.com/package/gulp): Automates Development Workflow Tasks
* [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins): Automates loading gulp plugins from package.json
* [gulp-bump](https://www.npmjs.com/package/gulp-bump): Bump any version in any file which supports semver versioning.
* [gulp-clean](https://www.npmjs.com/package/gulp-clean): Removes files and folders.
* [gulp-concat](https://www.npmjs.com/package/gulp-concat): Concatenates Files
* [gulp-filter](https://www.npmjs.com/package/gulp-filter): Filter files in a Vinyl stream
* [gulp-if](https://www.npmjs.com/package/gulp-if): Conditionally control the flow of vinyl objects.
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify): Minifies javascript files
* [gulp-shell](https://www.npmjs.com/package/gulp-shell): A handy command line interface for gulp
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps): Write inline source maps
* [gulp-tag-version](https://www.npmjs.com/package/gulp-tag-version): Tag git repository with current package version (gulp plugin).
* [gulp-rename](https://www.npmjs.com/package/gulp-rename): Provides simple file renaming methods.
* [gulp-git](https://www.npmjs.com/package/gulp-git): Git plugin for Gulp
* [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages): Publishes content to Github pages
* [gulp-postcss](https://www.npmjs.com/package/gulp-postcss): Pipe CSS through several plugins, but parse CSS only once
* [postcss-reporter](https://www.npmjs.com/package/postcss-reporter): A PostCSS plugin to console.log() the messages (warnings, etc.) registered by other PostCSS plugins.
* [postcss-scss](https://www.npmjs.com/package/postcss-scss): A SCSS parser for PostCSS.
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer): Prefix CSS with Autoprefixer
* [gulp-sass](https://www.npmjs.com/package/gulp-sass): Compile .scss files to css
* [cssnano](https://www.npmjs.com/package/cssnano): Modular CSS minifier.
* [gulp-imagemin](https://www.npmjs.com/package/imagemin): Minify images seamlessly
* [fancy-log](https://www.npmjs.com/package/fancylog): Allows you to console log with nice output

_The following modules are not used in the gulpfile, but are included in the styles. Read more about them in the Sass section of the readme._

* browser-sync
* support-for
* breakpoint-sass
* normalize.css

Copyright (c) 2018 Palantir.net

