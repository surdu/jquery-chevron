module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      options: {
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
      },
      dist: {
        files: {
          'dist/chevron.min.js': ["src/chevron.js"]
        }
      }
    },

    jasmine: {
      jQuery2: {
        src: "dist/chevron.min.js",
        options: {
          outfile: "specs/_SpecRunner.html",
          specs: [
            "specs/*-spec.js",
          ],
          template: "specs/runner.tmpl",
          vendor: [
            "http://code.jquery.com/jquery-2.1.3.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("test", ["uglify", "jasmine"]);
};
