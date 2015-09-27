module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngAnnotate: {
      app: {
          files: {
                  'public/dist/annotated.js': [
                    'public/app/controllers/PhotoController.js',
                    'public/app/directives/directives.js',
                    'public/app/services/PhotoService.js',
                    'public/app/app.js'
                    ]
                  },
          }
    },

    jshint: {
      files: [
        // Add filespec list here
        'public/app/controllers/PhotoController.js',
        'public/app/directives/directives.js',
        'public/app/services/PhotoService.js',
        'public/app/app.js'
      ],
      options: {
        force: 'true',
        ignores: []
      }
    },

    clean: {
          js: ["public/dist/*.js","!public/dist/*.min.js"]
        },
    concat: {
      basic: {
        src: ['public/bower_components/angular/angular.js',
              'public/bower_components/ui-router/release/angular-ui-router.js',
              'public/bower_components/jquery/dist/jquery.js',
              'public/bower_components/bootstrap/dist/js/bootstrap.js',
              'public/bower_components/aws-sdk-js/dist/aws-sdk.js',
              'public/app/socket-io.js'
              ],
        dest: 'public/dist/lib.js' 
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/main.min.js': ['public/dist/annotated.js'],
          'public/dist/lib.min.js': ['public/dist/lib.js']
        }
      }
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/bower_components/bootstrap/dist/css/bootstrap.css','public/style/main.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/app/*.js','public/styles/*.css'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'jshint',
    'ngAnnotate',
    'concat',
    'uglify',
    'cssmin',
    'clean'
  ]);

};