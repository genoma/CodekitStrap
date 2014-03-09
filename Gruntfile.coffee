module.exports = (grunt) ->
  grunt.initConfig

    pkg: grunt.file.readJSON("package.json")

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

    less:
      development:
        options:
          paths: ["less"]
        files:
          "css/app.css": "less/global.less"

    uglify:
      options:
        mangle: false
      my_target:
        files:
          "js/app.min.js": ["js/app.js"]

    cssmin:
      add_banner:
        options:
          banner: "/** G **/"
        files:
          "css/app.min.css": ["css/app.css"]

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
            return content
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

    concat:
      index:
        src: ["templates/base/header.html", "templates/index.html", "templates/base/footer.html"]
        dest: "index.html"

    watch:
      less:
        files: "less/*.less"
        tasks: ["newer:less", "newer:cssmin"]
      coffee:
        options:
          livereload: true
        files: [
          "coffeescript/*.*"
          "p_coffeescript/*.*"
        ]
        tasks: ["newer:coffee", "newer:uglify"]
      html:
        options:
          livereload: true
        files: ["templates/*.html", "templates/base/*.html"]
        tasks: ["newer:concat"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-newer"

  grunt.registerTask "build", [
    "newer:concat"
    "newer:less"
    "newer:coffee"
    "newer:cssmin"
    "newer:uglify"
  ]
  grunt.registerTask "default", [
    "build"
    "watch"
  ]
  grunt.registerTask "dist", [
    "newer:copy"
  ]

  return
