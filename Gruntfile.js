module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: require('node-bourbon').includePaths
                },
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                }
            },
            pretty: {
                files: ['dist/*.html'],
                tasks: ['prettify']
            },
            images: {
                files: ['*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            js: {
                files: ['assets/js/script.js'],
                tasks:  ['concat']
            },
            minify: {
                files: ['assets/js/production.js'],
                tasks: ['uglify']
            }

        },
        prettify: {
            options: {
                "indent": 4,
                "condense": true,
                "indent_inner_html": true,
                "unformatted": [
                    "a",
                    "pre"
                ]
            },
            all: {
                expand: true,
                ext: '.html',
                src: ['*.html'],
                dest: ''
            },
        },
    

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-prettify');

    grunt.registerTask('default', ['watch', 'sass', 'prettify']);

};