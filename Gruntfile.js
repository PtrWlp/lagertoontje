module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: "src/layouts/default.hbs",
                partials: ['src/partials/*.hbs'],
                flatten: true
            },
            pages: {
                files: {
                    'web/': ['src/pages/**/*.hbs']
                }
            }
        },
        clean: {
            all: ['web/*.*']
        },
        copy: {
            favicon: {
                expand : true,
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
        } 

    });
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'assemble', 'copy']);
};
