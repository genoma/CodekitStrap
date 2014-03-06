module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compileJoined: {
        options: {
          join: true
        },
        files: {
          'js/app.js': ['coffeescripts/*.coffee']
        }
      },
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'p_coffeescripts',
        src: ['*.coffee'],
        dest: 'js/plugins/',
        ext: '.js'
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      // less: {
      //   files: 'scss/**/*.scss',
      //   tasks: ['sass']
      // },
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
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build', ['newer:sass', 'newer:coffee']);
  grunt.registerTask('default', ['build','watch']);
}

