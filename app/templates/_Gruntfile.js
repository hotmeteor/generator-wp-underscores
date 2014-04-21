module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        themeName: "<%= _.slugify(themename) %>",
        dist: "dist"
    };

    grunt.initConfig({

        // configurable paths
        yeoman: {
            dist: yeomanConfig.dist,
            themeName: yeomanConfig.themeName
        },

        // pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'css/sass',
                    cssDir: 'css',
                    imagesDir: 'images',
                    javascriptsDir: 'js',
                    fontsDir: 'fonts',
                    outputStyle: 'compressed',
                    relativeAssets: true,
                    noLineComments: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['css/sass/*.scss'],
                tasks: ['compass']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: ['build.html']
        },
        usemin: {
            css: ['<%= yeoman.dist %>/css/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: '<%= yeoman.dist %>',
                    src: [                    
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*',

                        'style.css',
                        '*.php',
                        'inc/{,*/}*.*',
                        'languages/{,*/}*.*',
                        'layouts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'css',
                dest: '<%= yeoman.dist %>/css',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        zip: {
            dist: {
                cwd: '<%= yeoman.dist %>/',
                src: ['<%= yeoman.dist %>/**/*'],
                dest: '<%= yeoman.dist %>/<%= yeoman.themeName %>-theme.zip'
            }            
        },

        // Process header.php
        processhtml: {
            options: {
                data: {
                }
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/header.php': ['header.php']
                }
            }
        }
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'uglify',
        'copy:dist',
        'processhtml:dist',
        'usemin',
        'zip'
    ]);
};