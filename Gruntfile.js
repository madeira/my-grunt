module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
          build: {
            src: [ 'src/scripts/libs/**.js', 'js/main.js'],
            dest: 'static/global.min.js'
          }
        },

        sass: {                              // Task
          dist: {                            // Target
            options: {                       // Target options
              style: 'expanded'
            },
            files: {                         // Dictionary of files
              'static/main.css': 'src/styles/main.scss',  // 'destination': 'source'
            }
          }
        },

        watch: {
            options: {
              livereload: true,
            },
            src: {
              files: ['src/scripts/libs/*.js', 'src/scripts/*.js', 'src/styles/*.scss', 'templates/*.html'],
              tasks: ['default'],
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 9']
            },
            no_dest: {
                src: 'css/build/main.css' // globbing is also possible here
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sass', 'autoprefixer']);
    grunt.registerTask('server', 'running a dev server', function(){
        grunt.task.run('connect:server:keepalive');
    });

};