module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                partials: ['src/partials/*.hbs'],
                flatten: true
            },
            main: {
                options: {
                  layout: "src/layouts/index.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'web/index.html'
            },
            articles: {
                options: {
                  layout: "src/layouts/article.hbs"
                },
                src: ['src/articles/*.hbs'],
                files: {
                    'web/': ['src/articles/**/*.hbs']
                },
                dest: 'web/'
            }
        },
        clean: {
            all: ['web/**/*.*']
        },
        copy: {
            favicon: {
                expand : false,
                src : 'src/favicon.ico',
                dest : 'web/favicon.ico'
            },
            css: {
                expand : true,
                cwd : 'src/css',
                src : '**',
                dest : 'web/css'
            },
            font: {
                expand : true,
                cwd : 'src/fonts',
                src : '**',
                dest : 'web/fonts'
            },
            audio: {
                expand : true,
                cwd : 'src/audio',
                src : '**',
                dest : 'web/audio'
            },
            img: {
                expand : true,
                cwd : 'src/img',
                src : '**',
                dest : 'web/img'
            },
            docs: {
                expand : true,
                cwd : 'src/docs',
                src : '**',
                dest : 'web/docs'
            },
            js: {
                expand : true,
                cwd : 'src/js',
                src : '**',
                dest : 'web/js'
            }
        }, 
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: ['src/css/*.css'],
				tasks: ['copy:css']
			},
			js: {
				files: ['src/js/lagertoontje.js'],
				tasks: ['copy:js'],
				options: {
					 nospawn: true
				}
			},
			html: {
				files: ['src/articles/*.hbs',
						'src/layouts/*.hbs',
						'src/partials/*.hbs'],
				tasks: ['assemble']
			}
		},
		connect: {
			lagertoontje: {
                options: {
                    hostname: 'localhost',
                    port: 80,
                    base: './',
                    open: 'http://localhost:80/web/index.html',
                    middleware: function (connect, options) {
                        // bug in connect 0.7+ , https://github.com/drewzboto/grunt-connect-proxy/issues/65
                        options.base = options.base[0];
                        var config = [];
                        // RewriteRules support
                        config.push(require('grunt-connect-rewrite/lib/utils').rewriteRequest);
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function (base) {
                            // Serve static files.
                            config.push(connect.static(base));
                        });
                        // Make directory browse-able.
                        config.push(connect.directory(directory));

                        return config;

                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'assemble', 'copy']);
    grunt.registerTask('server', ['clean', 'assemble', 'copy', 'watch']);
};
