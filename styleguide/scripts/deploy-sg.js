#!/usr/bin/env node

/**
 * This task pushes the /build/static directory to the `package` branch of the repo.
 */

const ghpages = require('gh-pages');
const packagejson = require('../package.json');
const version = packagejson.version;

// Define options for publish method.
let options = {
  branch: 'dev-assets',
  message: `Auto-generated commit during deploy: ${version}`,
  dest: 'assets'
};

// Process the args passed in to find tag
const tag = process.argv.find((arg) => arg === 'tag');
if (tag) {
  options.tag = `sg-${version}`;
}

// Deploy the static output to package branch using defined options.
ghpages.publish('public/assets', options, function(err) {
  if (err) {
    console.error(`Akamai styleguide | There was an error during deployment: ${err}`);
  }
  else {
    console.log(`Akamai styleguide | Woo-hoo! 🎉 The deployment was a success!`)
  }
});
