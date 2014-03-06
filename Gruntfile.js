module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {

      compileJoined: {
        options: {
          join: true
        }
      },

      files: {
        'js/app.js': ['coffeescript/*.coffee']
      },

      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'p_coffeescript',
        src: ['*.coffee'],
        dest: 'js/plugins/',
        ext: '.js'
      }

    },
    less: {
      development: {
        options: {
          paths: ["less"]
        },
        files: {
          "css/app.css": "less/global.less"
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      less: {
        files: 'less/*.less',
        tasks: ['less']
      },

      coffee: {
        options: {
          livereload: true
        },
        files: ['coffeescripts/*.*', 'p_coffeescripts/*.*'],
        tasks: ['coffee']
      },

      html: {
        options: {
          livereload: true
        },
        files: ['*.html']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build', ['newer:less', 'newer:coffee']);
  grunt.registerTask('default', ['build','watch']);
}

