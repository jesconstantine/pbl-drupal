// @copyright Copyright (c) 2018 Palantir.net

// package vars
var pkg = require('./package.json');

// load all plugins in 'dependencies' into the variable $
var $ = require('gulp-load-plugins')({
    pattern: ['*'],
    scope: ['dependencies']
});


/////////////////
//  FUNCTIONS  //
/////////////////

// Clean
// Description: Removing assets files before running other tasks
function clean() {

  $.fancylog.i('Cleaning Assets');
  // Look in the public assets directory
  return $.gulp.src(pkg.settings.dest.assets, { allowEmpty: true })
    // Clean it out
    .pipe($.clean({read: false, force: true}))
}

// PrepAssets
// Description: Removing assets files before running other tasks
function prepAssets() {

  $.fancylog.i('Prepping Assets');
  // Look in the public assets directory
  return $.del(['public/**/*', '!public/assets', '!public/assets/**/*'])
}

// Handle Custom scripts
// Description: Minifies Custom Scripts
function customScripts() {

  $.fancylog.i('Minifying Custom Scripts');
  // Look for all scripts in source/assets/js
  return $.gulp.src(pkg.settings.files.script_custom, { allowEmpty: true })
    // Create a sourcemap for inspecting
    .pipe($.sourcemaps.init())
    // Concatenate them together into one js file.
    .pipe($.concat('site.js'))
    // Minify that file
    .pipe($.uglify())
    // And give it a suffix
    .pipe($.rename({suffix: '.min'}))
    // Complete the sourcemap by creating the file.
    .pipe($.sourcemaps.write('.'))
    // Then send it to public/assets/js
    .pipe($.gulp.dest(pkg.settings.dest.js))
}

// Handle library scripts
// Description: Minifies library Scripts
function libraryScripts() {

  $.fancylog.i('Minifying Scripts from libraries');
  // Look for all scripts in source/assets/js
  return $.gulp.src(pkg.settings.files.script_libraries, { allowEmpty: true })
    // Create a sourcemap for inspecting
    .pipe($.sourcemaps.init())
    // Concatenate them together into one js file.
    .pipe($.concat('libraries.js'))
    // Minify that file
    .pipe($.uglify())
    // And give it a suffix
    .pipe($.rename({suffix: '.min'}))
    // Complete the sourcemap by creating the file.
    .pipe($.sourcemaps.write('.'))
    // Then send it to public/assets/js
    .pipe($.gulp.dest(pkg.settings.dest.js))
}

// Handle images
// Looks for image updates and Minifies them.
function image() {

  $.fancylog.i('Fixing up Images');
  // Look for images in source/assets/imgs
  return $.gulp.src(pkg.settings.files.imgs, { allowEmpty: true })
    // Minify those images.
    .pipe($.imagemin())
    // Then send the images to public/assets/imgs
    .pipe($.gulp.dest(pkg.settings.dest.img))
}

// Handle icons
// Looks for image updates and Minifies them.
function copyIcons() {

  $.fancylog.i('Copying icons');
  // Look for icons in source/_patterns/01-base/icons
  return $.gulp.src(pkg.settings.files.icons, { allowEmpty: true })
    // Send the icons to public/assets/icons
    .pipe($.gulp.dest(pkg.settings.dest.icons))
}

// Handle icons
// Looks for image updates and Minifies them.
function copyTaxIcons() {

  $.fancylog.i('Copying taxonomy icons');
  // Look for icons in source/_patterns/01-base/icons
  return $.gulp.src(pkg.settings.files.taxonomyIcons, { allowEmpty: true })
      // Send the icons to public/assets/icons
      .pipe($.gulp.dest(pkg.settings.dest.taxonomyIcons))
}

// Handle Sass and CSS
// Description: Creates css sourcemap, compiles sass into css, prefixes that with autoprefixer
function sass() {

  $.fancylog.i('Prefixing & Compiling Sass into CSS');
  // Look for scss files
  return $.gulp.src(pkg.settings.files.stylesheet, { allowEmpty: true })
    // Create a sourcemap for inspecting
    .pipe($.sourcemaps.init())
    // Glob the scss.
    .pipe($.sassGlob())
    // Compress the sass.
    .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
    // Now run Post css which will minify and autoprefix.
    .pipe($.postcss())
    // If this is production, then minify this
    .pipe($.rename({suffix: '.min'}))
    // Complete the sourcemap by creating the file.
    .pipe($.sourcemaps.write('.'))
    // Place the css in public/assets/css
    .pipe($.gulp.dest(pkg.settings.dest.css))
}

// patternlab
// Description: Build static Pattern Lab files via PHP script
function patternlab() {

  $.fancylog.i('Building Patterns');
  // We are in the root
  return $.gulp.src('.', {read: false})
    // Run the generate command
    .pipe($.shell(['php core/console --generate']))
}

// styleguide
// Description: Copy Styleguide-Folder from core/ to public
function styleguide() {

  $.fancylog.i('Moving Patterns');
  // Look in source
  return $.gulp.src(pkg.settings.patternlab.styleguide.files)
    // Move to public
    .pipe($.gulp.dest(pkg.settings.patternlab.styleguide.dest));
}

// Serve
// Serve up the browsersync
function server(done) {

  $.fancylog.i('Syncing Browsers');
   // Browsersync options
  $.browserSync.init({
    server: { baseDir: pkg.settings.root },
    ghostMode: true,
    open: "local"
  });
  done();
}

// Reload Browsers
// Reload the browser with BrowserSync
function reload(done) {
  $.browserSync.reload();
  done();
}

// Watch
// Description: Watches twig, json, js, css, imgs, and scss for updates

function watch() {

  // Watch Pattern Lab files
  $.gulp.watch(
    pkg.settings.patternlab.files,
    $.gulp.series(patternlab, reload)
  );

  // Watch custom scripts
  $.gulp.watch(
    pkg.settings.files.script_custom,
    $.gulp.series(customScripts, patternlab, reload)
  );

  // Watch library scripts
  $.gulp.watch(
    pkg.settings.files.script_libraries,
    $.gulp.series(libraryScripts, patternlab, reload)
  );

  // Watch images
  $.gulp.watch(pkg.settings.files.imgs,
    $.gulp.series(image, patternlab, reload)
  );

  // Watch Sass
  $.gulp.watch(
    pkg.settings.files.scss,
    $.gulp.series(sass, patternlab, reload)
  );
}

/////////////////
//    TASKS    //
/////////////////

// Default
// Description: Build all stuff of the project once
$.gulp.task('default',

  $.gulp.series(
    clean,
    $.gulp.parallel(sass, image, customScripts, libraryScripts),
    patternlab,
    styleguide
  )
);

// Start your production-process
// Description: Type 'gulp' in the terminal
$.gulp.task('serve',

  $.gulp.series(
    'default',
    server,
    watch
  )
);

// Publish static content
// Description: Publish static content using rsync shell command

function publish() {

  $.fancylog.i('Pushing to gh-pages branch');
  // Look in public
  return $.gulp.src(pkg.settings.deployment.local.path)
    // Defaults to gh-pages, push public to destination branch
    .pipe($.ghPagesWill());
}

// Publish static assets
// Description: Publish static content using rsync shell command

function publishAssets() {

  $.fancylog.i('Pushing to dev-assets branch');
  // Look in public
  return $.gulp.src(pkg.settings.deployment.local.path)
  // Defaults to gh-pages, push public to destination branch
    .pipe($.ghPagesWill({branch: 'dev-assets'}));
}

// Task: Deploy to GitHub pages
// Description: Build the public code and deploy it to GitHub pages
$.gulp.task('deploy',
  // make sure to use the gulp from node_modules and not a different version
  $.gulp.series(
    'default',
    publish
  )
);

// Task: Deploy to GitHub pages
// Description: Build the public code and deploy it to GitHub pages
$.gulp.task('deployAssets',
  // make sure to use the gulp from node_modules and not a different version
  $.gulp.series(
    'default',
    copyIcons,
    copyTaxIcons,
    prepAssets,
    publishAssets
  )
);

// Function: Releasing (Bump & Tagging)
// Description: Bump npm versions, create Git tag and push to origin
$.gulp.task('release', function () {

  $.fancylog.i('Tagging a Release');
  // Look in public
  $.gulp.src(pkg, { allowEmpty: true })
    // Bumps the version
    .pipe($.bump({type: $.gulp.env.type || 'patch'}))
    // Sets the destination
    .pipe($.gulp.dest('./'))
    // Crafts a commit message
    .pipe($.git.commit('Release a ' + $.gulp.env.type + '-update'))
    // read only one file to get version number
    .pipe($.filter('pkg'))
    // Tag it
    .pipe($.tagversion())
    // Publish files and tags to endpoint
    .pipe($.shell([
      'git push origin develop',
      'git push origin --tags'
    ]));
});
