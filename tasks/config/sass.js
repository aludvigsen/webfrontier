/**
 * Compiles SASS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            options: {
                // includePaths: require('node-bourbon').with('other/path', 'another/path')
                // - or -
                includePaths: require('node-bourbon').includePaths
            },
            files: [{
                expand: true,
                cwd: 'assets/styles/',
                src: ['*.scss', '*.sass'], // Feel free to remove a format if you do not use it.
                dest: '.tmp/public/styles/',
                ext: '.css'
            }]
    }});

    grunt.loadNpmTasks('grunt-sass');
};
