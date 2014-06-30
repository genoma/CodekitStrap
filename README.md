bootstrap-configuration with GULP!
==================================

Front end development configuration with Bootstrap as a Git module, Gulp configuration for main project with Less, CoffeeScript and a basic template management to support splitting of header, footer and content (conceptually still a work in progress).

## Gulp Tasks

### `$ gulp`

Watches files and compiles relevant Less, CoffeeScript and HTML and use Browser-Sync to push everything to your browser of choice.

### `$ gulp build`

Minify Css and Js files.

### `$ gulp dist`

Place in a dist folder only relevant files, html, Js, CSS and  changes references to the minified version of your Javascript and CSS.
