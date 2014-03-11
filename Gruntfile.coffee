module.exports = (grunt) ->
  grunt.initConfig

    pkg: grunt.file.readJSON("package.json")

    # Compile CoffeeScript + Plugins
    coffee:
      compileJoined:
        options:
          join: true
        files:
          "js/app.js": ["coffeescript/*.coffee"]
      glob_to_multiple:
        expand: true
        flatten: true
        cwd: "p_coffeescript"
        src: ["*.coffee"]
        dest: "js/plugins/"
        ext: ".js"

    # Compile Less
    less:
      development:
        options:
          paths: ["less"]
        files:
          "css/app.css": "less/global.less"

    # Uglify javascript files
    uglify:
      options:
        mangle: false
      my_target:
        files:
          "js/app.min.js": ["js/app.js"]

    # Minify CSS
    cssmin:
      add_banner:
        options:
          banner: "/** G **/"
        files:
          "css/app.min.css": ["css/app.css"]

    # Copy the relevants Bootstrap JS, project CSS, Bower modules
    # to build a concrete development enviroment
    copy:
      html:
        expand: true
        src: "*.html"
        dest: "dist/"
        options:
          process: (content, srcpath) ->
            content = content.replace('<!-- CSSRefresh & Livereload - REMOVE BEFORE GOING LIVE  -->\n', '')
            content = content.replace('<script src="cssrefresh.js"></script>\n', '')
            content = content.replace('<script src="http://localhost:35729/livereload.js"></script>\n', '')
            content = content.replace('app.css', 'app.min.css')
            content = content.replace('app.js', 'app.min.js')
            return content
      img:
        expand: true
        src: "images/**"
        dest: "dist/"
      css:
        expand: true
        src: "css/**"
        dest: "dist/"
      js:
        expand: true
        src: "js/**"
        dest: "dist/"
      bower:
        expand: true
        src: "bower_components/**"
        dest: "dist/"
      bootstrapSP:
        expand: true
        flattern: true
        filter: "isFile"
        cwd: "bootstrap/"
        src: "js/*"
        dest: "dist/"
      bootstrapTOT:
        expand: true
        flattern: true
        filter: "isFile"
        cwd: "bootstrap/dist/"
        src: "js/*"
        dest: "dist/"
      prepareSP:
        expand: true
        flattern: true
        filter: "isFile"
        cwd: "bootstrap/"
        src: "js/*"
        dest: ""
      prepareTOT:
        expand: true
        flattern: true
        filter: "isFile"
        cwd: "bootstrap/dist/"
        src: "js/*"
        dest: ""

    # Concatenate the HTML files like a template manager
    # framework ala Smarty does
    concat:
      index:
        src: ["templates/base/meta/index.html", "templates/base/header.html", "templates/index.html", "templates/base/footer.html"]
        dest: "index.html"

    # Watch files changes and compile what it needs to be
    # compiled.
    watch:
      less:
        files: "less/*.less"
        tasks: ["less"]
      coffee:
        options:
          livereload: true
        files: [
          "coffeescript/*.*"
          "p_coffeescript/*.*"
        ]
        tasks: ["newer:coffee"]
      html:
        options:
          livereload: true
        files: ["templates/*.html", "templates/base/*.html", "templates/base/meta/*.html"]
        tasks: ["newer:concat"]

  require('time-grunt')(grunt)

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-newer"

  # The main build task
  grunt.registerTask "build", [
    "newer:concat"
    "less"
    "coffee"
    "cssmin"
    "uglify"
  ]

  # Build and watch for changes
  grunt.registerTask "default", [
    "build"
    "watch"
  ]

  # Build the distribuition folder
  grunt.registerTask "dist", [
    "newer:copy:html"
    "newer:copy:img"
    "newer:copy:css"
    "newer:copy:js"
    "newer:copy:bower"
    "newer:copy:bootstrapSP"
    "newer:copy:bootstrapTOT"
  ]

  # Prepare development
  grunt.registerTask "prepare", [
    "newer:copy:prepareSP"
    "newer:copy:prepareTOT"
  ]
  return
