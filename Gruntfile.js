module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      options: {
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
      },
      dist: {
        files: {
          'chevron.min.js': ["chevron.js"]
        }
      }
    },

    jasmine: {
      src: "utils.min.js",
      options: {
        specs: [
          "specs/*-spec.js"
        ],
        vendor: "http://code.jquery.com/jquery-2.1.3.min.js"
      }
    }

    watch: {
      files: ["src/*.js", "specs/*-spec.js"],
      tasks: "test",
      options: {
        debounceDelay: 1000,
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("default", ["uglify", "jasmine"]);
};
