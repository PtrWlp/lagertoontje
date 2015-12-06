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
            carbid: {
                options: {
                  layout: "src/layouts/carbid.hbs"
                },
                src: ['src/partials/main.hbs'],
                dest: 'target/carbid.html'
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
            font: {
                expand : true,
                cwd : 'src/fonts',
                src : '**',
                dest : 'target/fonts'
            },
            audio: {
                expand : true,
                cwd : 'src/audio',
                src : '**',
                dest : 'target/audio'
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
            js: {
                expand : true,
                cwd : 'src/js',
                src : '**',
                dest : 'target/js'
            }
        },
        connect: {
            server: {
                options: {
                    livereload: false,
                    base: 'target', 
                    port: 80
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
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['clean', 'assemble', 'copy']);
    grunt.registerTask('develop', ['clean', 'assemble', 'copy', 'connect', 'watch']);
};
