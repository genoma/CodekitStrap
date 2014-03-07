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

    watch:
      grunt:
        files: ["Gruntfile.js"]

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
        tasks: ["coffee"]

      html:
        options:
          livereload: true

        files: ["*.html"]

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-newer"

  grunt.registerTask "build", [
    "newer:less"
    "newer:coffee"
    "uglify"
    "cssmin"
  ]
  grunt.registerTask "default", [
    "build"
    "watch"
  ]
  return
