module.exports = function( grunt ) {

	grunt.initConfig( {

		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.face.js"],
				dest: "dist/jquery.face.js"
			}
		},

		jshint: {
			files: [
				"src/jquery.face.js",
				"test/**/*.js"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: ["dist/jquery.face.js"],
				dest: "dist/jquery.face.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		less: {
			dist: {
				files: {
      		'dist/jquery.face.css': 'src/jquery.face.less'
    		},
				compress: true
			}
		},

		karma: {
			unit: {
				configFile: "karma.conf.js",
				singleRun: false,
				browsers: ["PhantomJS"]
			}

			// travis: {
			// 	configFile: "karma.conf.js",
			// 	singleRun: true,
			// 	browsers: [ "PhantomJS" ]
			// }
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: ["src/*", "test/**/*"],
			tasks: ["default"]
		}

	} );

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");

	grunt.registerTask("travis", ["jshint", "karma:travis"]);
	grunt.registerTask("lint", ["jshint", "jscs"]);
	grunt.registerTask("build", ["concat", "uglify", "less"]);
	grunt.registerTask("default", ["jshint", "build", "karma:unit"]);
};
