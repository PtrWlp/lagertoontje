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
                dest: 'target/index.html'
            },
            about: {
                options: {
                  layout: "src/layouts/about.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/about.html'
            },
            bezwaar: {
                options: {
                  layout: "src/layouts/bezwaar.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/bezwaar/index.html'
            },
            amsterdamsbeleid: {
                options: {
                  layout: "src/layouts/amsterdamsbeleid.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/amsterdamsbeleid/index.html'
            },
            meteo: {
                options: {
                  layout: "src/layouts/meteo.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/meteo/index.html'
            },
            meewind: {
                options: {
                  layout: "src/layouts/meewind.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/meewind/index.html'
            },
           naslag: {
                options: {
                  layout: "src/layouts/naslag.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/naslag.html'
            },
            pers: {
                options: {
                  layout: "src/layouts/pers.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/pers.html'
            },
            links: {
                options: {
                  layout: "src/layouts/links.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/links.html'
            },
            articles: {
                options: {
                  layout: "src/layouts/article.hbs"
                },
                src: ['src/articles/*.hbs'],
                files: {
                    'target/': ['src/articles/**/*.hbs']
                },
                dest: 'target/'
            }
        },
        clean: {
            all: ['target/**/*.*']
        },
        copy: {
            favicon: {
                expand : false,
                src : 'src/favicon.ico',
                dest : 'target/favicon.ico'
            },
            googleverify: {
                expand : false,
                src : 'src/google8ffff2c5aa03806c.html',
                dest : 'target/google8ffff2c5aa03806c.html'
            },
            css: {
                expand : true,
                cwd : 'src/css',
                src : '**',
                dest : 'target/css'
            },
            assets: {
                expand : true,
                cwd : 'assets',
                src : '**',
                dest : 'target/assets'
            },
            zaak: {
                expand : true,
                cwd : 'zaak',
                src : '**',
                dest : 'target/zaak'
            },
            font: {
                expand : true,
                cwd : 'src/fonts',
                src : '**',
                dest : 'target/fonts'
            },
            media: {
                expand : true,
                cwd : 'src/media',
                src : '**',
                dest : 'target/media'
            },
            img: {
                expand : true,
                cwd : 'src/img',
                src : '**',
                dest : 'target/img'
            },
            docs: {
                expand : true,
                cwd : 'src/docs',
                src : '**',
                dest : 'target/docs'
            },
            docsamsterdam: {
                expand : true,
                cwd : 'src/docsamsterdam',
                src : '**',
                dest : 'target/docsamsterdam'
            },
            docsMeteo: {
                expand : true,
                cwd : 'src/docs',
                src : 'motiemeteocorrectie.pdf',
                dest : 'target/meteo'
            },
            docsMeteo2: {
                expand : true,
                cwd : 'src/docs',
                src : 'meteo-geluid_en_wind_erik_salomons.pdf',
                dest : 'target/meteo'
            },
            
            zienswijzen: {
                expand : true,
                cwd : 'src/zienswijzen',
                src : '**',
                dest : 'target/zienswijzen'
            },
            js: {
                expand : true,
                cwd : 'src/js',
                src : '**',
                dest : 'target/js'
            }
            // ,
            // carbid: {
            //     options: {
            //        layout: "src/layouts/carbid.hbs"
            //     },
            //     src: ['src/partials/main.hbs'],
            //     dest: 'target/carbid.html'
            // }
        },
        connect: {
            server: {
                options: {
                    livereload: false,
                    base: 'target', 
                    port: 8085,
                    open: 'http://localhost:8085/index.html',
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
        },
		watch: {
			options: {
				livereload: false,
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
		}
    });
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'assemble', 'copy']);
    grunt.registerTask('develop', ['clean', 'assemble', 'copy', 'connect', 'watch']);
};
