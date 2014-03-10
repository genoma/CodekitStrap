bootstrap-configuration
=======================

Front end development configuration with Bootstrap as a git module, Grunt configuration for main project with Less, CoffeeScript support, templating support.

## Grunt Tasks

### `$ grunt prepare`

When a **Bootstrap** update is downloaded, the _prepare_ task copies all the relevant file into the main development folder.

### `$ grunt build`

Build the current development files (html, css, jscript).

### `$ grunt`

Check for relevant changes in the **Less**, **CoffeeScript** and **HTML** files and consequently compile them.

### `$ grunt dist`

Copy the relevant files into the `dist/` folder, ready to be published.
