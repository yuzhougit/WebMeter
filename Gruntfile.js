// Generated on 2014-08-13 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var fs = require('fs');
    var request = require('request');

    // App configurations
    var appConf = require('./app/config.json');

    var appConfig = {
        app  : 'app',
        id   : appConf.id,
        dist : 'dist',
        url  : '',
        ver  : appConf.version,
        name : appConf.name,
        base : '../App_Framework/app'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            scripts: {
                files: ['<%= yeoman.app %>/scripts/**/*.*'],
                tasks: ['copy:scripts'], //'newer:jshint:all'
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/**/*.*'],
                tasks: ['copy:images','less:development','copy:styles','cleanStyles'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            views : {
                files: [
                    '<%= yeoman.app %>/views/{,*/}*.html'
                ],
                tasks: ['copy:views'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            resources: {
                files: [
                    '<%= yeoman.app %>/resources/**/*.*'
                ],
                tasks: ['copy:resources'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            others: {
                files: [
                    '<%= yeoman.app %>/*.*'
                ],
                tasks: ['copy:others'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/unit/{,*/}*.js'],
                tasks: ['copy:testOnly', 'karma'] //'newer:jshint:test'
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9011,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                base: '.tmp',
                livereload: 35750
            },
            dev: {
                options: {
                    open: true,
                    keepalive: true
                }
            },
            livereload: {
                options: {
                    open : {
                        target: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>?debug=<%= yeoman.id %>'
                    },
                    //keepalive: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9011,
                    middleware: function (connect) {
                        return [connect.static('test')
                           // connect().use(
                           //     '/bower_components',
                           //     connect.static('./bower_components')
                           // ),
                           // connect.static('modules/<%= yeoman.id %>')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            zip: '<%= yeoman.name %>.<%= yeoman.ver %>.zip',
            dist: {
                files: [{
                    dot: true,
                    src: [
                      '<%= yeoman.dist %>'
                    ]
                }]
            },
            server: '.tmp',
            test: '.tmp/.test',
            styles: {
                src: ['<%= yeoman.app %>/styles/themes/css/', '<%= yeoman.base %>/styles/themes/css/']
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>'
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js','bower_components/pace/pace.js'],
                ignorePath:  /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: [{
                  expand: true,
                  cwd: '<%= yeoman.dist %>/styles',
                  src: '**/*.css',
                  dest: '<%= yeoman.dist %>/styles'
                }]
            }
        },
        uglify: {
            dist: {
                files:  [{
                  expand: true,
                  cwd: '<%= yeoman.dist %>/',
                  src: '**/*.js',
                  dest: '<%= yeoman.dist %>/'
                }]
            }
        },
        concat: {
            dist: {}
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: '**/*.*'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles/themes',
                        dest: '<%= yeoman.app %>/styles/themes/css',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/styles/themes/',
                        dest: '<%= yeoman.app %>/styles/themes/css',
                        src: ['**/library.less','**/elements.less', 'imports/libs/*.less']
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/styles/themes',
                        dest: '<%= yeoman.base %>/styles/themes/css',
                        src: '**/*.*'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/modules/<%= yeoman.id %>/styles/',
                src: '**/*.*'
            },
            scripts: {
                expand: true,
                cwd: '<%= yeoman.app %>/scripts',
                dest: '.tmp/modules/<%= yeoman.id %>/scripts/',
                src: '**/*.*'
            },
            views: {
                expand: true,
                cwd: '<%= yeoman.app %>/views',
                dest: '.tmp/modules/<%= yeoman.id %>/views/',
                src: '**/*.*'
            },
            resources: {
                expand: true,
                cwd: '<%= yeoman.app %>/resources',
                dest: '.tmp/modules/<%= yeoman.id %>/resources/',
                src: '**/*.*'
            },
            others: {
                expand: true,
                cwd: '<%= yeoman.app %>/',
                dest: '.tmp/modules/<%= yeoman.id %>/',
                src: '*.*'
            },
            all: {
                files: [{
                        expand: true,
                        cwd: '<%= yeoman.base %>/',
                        dest: '.tmp',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.tmp/modules/<%= yeoman.id %>',
                        src: '**/*.*'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.tmp/modules/<%= yeoman.id %>',
                        src: '**/*.*'
                    }
                ]
            },
            base: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/',
                        dest: '.tmp',
                        src: ['*.*', 'common/**/*.*', 'modules/**/*.*', 'scripts/**/*.*', 'styles/**/*.*', 'views/**/*.*']
                    }
                ]
            },
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/',
                        dest: '.tmp',
                        src: 'lib/**/*.*'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/lib',
                        dest: '.tmp/.test/lib',
                        src: '**/*.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.base %>/common',
                        dest: '.tmp/.test/common',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.tmp/.test/app',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: 'test/',
                        dest: '.tmp/.test/test',
                        src: '**/*.*'
                    }
                ]
            },
            testOnly: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/',
                        dest: '.tmp/.test/test',
                        src: '**/*.*'
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'less:framework',
                'less:development'
            ],
            test: [
                'copy:test'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: '.tmp/.test/test/karma.conf.js'
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= yeoman.name %>.<%= yeoman.ver %>.zip'
                },
                files: [
                    {expand: true, cwd: '<%= yeoman.app %>/', src: ['*/**', '*.json', '*.js', '*.html']}
                ]
            },
            dist: {
              options: {
                archive: '<%= yeoman.name %>.<%= yeoman.ver %>.zip'
              },
              files: [
                {expand: true, cwd: '<%= yeoman.dist %>/', src: ['*/**', '*.json', '*.js', '*.html']}
              ]
            }
        },

        less: {
            development: {
                options: {
                    paths : ['<%= yeoman.app %>/styles/themes'],
                    sourceMap: false,
                    sourceMapBasepath : "<%= yeoman.app %>/styles/themes/default",
                    sourceMapFilename : "<%= yeoman.app %>/styles/themes/default/default.css.map"
                },
                files: [{
                    expand: true,
                    cwd: "<%= yeoman.app %>/styles/themes/css/",
                    src: ["**/*.less"],
                    dest: "<%= yeoman.app %>/styles/themes/css/",
                    ext: ".css"
                }]
            },
            dist: {
              options: {
                paths : ['<%= yeoman.dist %>/styles/themes'],
                sourceMap: false,
                sourceMapBasepath : "<%= yeoman.dist %>/styles/themes/default",
                sourceMapFilename : "<%= yeoman.dist %>/styles/themes/default/default.css.map"
              },
              files: [{
                expand: true,
                cwd: "<%= yeoman.dist %>/styles/themes/css/",
                src: ["**/*.less"],
                dest: "<%= yeoman.dist %>/styles/themes/css/",
                ext: ".css"
              }]
            },
            framework: {
                options: {
                    paths : ['<%= yeoman.app %>/styles/themes'],
                    sourceMap: false,
                    sourceMapBasepath : "<%= yeoman.base %>/styles/themes/default",
                    sourceMapFilename : "<%= yeoman.base %>/styles/themes/default/default.css.map"
                },
                files: [{
                    expand: true,
                    cwd: "<%= yeoman.base %>/styles/themes/css/",
                    src: ["**/*.less"],
                    dest: "<%= yeoman.base %>/styles/themes/css/",
                    ext: ".css"
                }]
            }
        },

        compass: {                      // Task
            dist: {                     // Target
                options: {              // Target options
                    sassDir: "<%= yeoman.app %>/styles/themes/default/sass",
                    cssDir: "<%= yeoman.app %>/styles/themes/default/css",
                    environment: 'production'
                }
            },
            dev: {                      // Another target
                options: {
                    sassDir: "<%= yeoman.app %>/styles/themes/default/sass",
                    cssDir: "<%= yeoman.app %>/styles/themes/default/css"
                }
            }
        }
    });


    grunt.registerTask('default', [
//        'newer:jshint',
//        'test',
//        'build'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

        if(grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'copy:images',
            'concurrent:server',
            'copy:all',
            'connect:livereload',
            'cleanStyles',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:test',
        'concurrent:test',
        'karma'
    ]);

    grunt.registerTask('cleanStyles', 'Force cleanup styles', function(){
        grunt.option('force', true);
        grunt.task.run('clean:styles');
    });

    grunt.registerTask('sass', ['compass:dev']);
    grunt.registerTask('css', ['copy:images','less:development']);

    grunt.registerTask('zip', ['compress']);

    grunt.registerTask('install', 'install dev module', function(){
            var str = fs.realpathSync('./' + appConfig.name + '.' + appConfig.ver + '.zip');
            console.log(str);
            var done = this.async();
            request.post({
                    url: "http://" + appConfig.url + "/api/app/install/",
                    qs: {localFile: str}
                }, function(err, response) {
                    if(!err && response != undefined && response.statusCode == 200) {
                        console.log("Success to install module");
                    } else {
                        var code = "unknown";
                        if(response) code = response.statusCode;
                        console.log('Fail to install module ' + err + ', code: ' + code);
                    }
                    done();
                }
            );
        }
    );

    grunt.registerTask('dist', 'Generate app archive file', function(){
        grunt.task.run(['copy:images', 'less:development','compress:main', 'cleanStyles']);
    });

    grunt.registerTask('dev', 'dev on current module', function(arg1){
        //grunt.task.run('cleanStyles');
        if(arg1 == "f"){
            grunt.task.run(['copy:dev']);
        } else if(arg1 == "b"){
            grunt.task.run(['copy:images','less:framework','copy:base', 'copy:lib']);
        } else if(arg1 == "bf"){
            grunt.task.run(['copy:images','less:framework','copy:base']);
        } else {
            grunt.task.run(['copy:images','less:development','copy:dev']);
        }
        grunt.task.run('cleanStyles');
    });

    grunt.registerTask('cls', 'Clean up workspace', function(){
        grunt.task.run(['clean:zip','clean:server','clean:test', 'cleanStyles']);
    });

    grunt.registerTask('build', 'Generate app archive file for publish', function(){
      grunt.task.run(['clean:dist',
        'copy:images',
        'copy:dist',
        'less:dist',
        'uglify:dist',
        'cssmin:dist',
        'htmlmin:dist',
        'cleanStyles',
        'compress:dist']);
    });
};
