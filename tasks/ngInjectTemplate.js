var through = require('through2'),
	gutil = require('gulp-util'),
	fs = require('fs'),
	path = require('path'),
	htmlMinify = require('html-minifier').minify,
	pkg = require('../package.json'),
	PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-ng-inject-template';

module.exports = function(){
	return through.obj(function (file, enc, cb) {
		var error = null,
			contents = file.contents.toString(),
			templateUrlRegExp = /templateUrl:\s'.+'/g,
			templateUrlMatch = contents.match(templateUrlRegExp),
			templatePath;

		if(templateUrlMatch){
			templatePath = path.join(process.cwd(), pkg.project.source, templateUrlMatch[0].slice(14, -1));

			fs.readFile(templatePath, 'utf8', function(error, template){
				var templateInOneLine = htmlMinify(template, {
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					customAttrCollapse: /options|items|ng-*/,
					removeComments: true
				}).replace(/'/g, "\\'").replace(/(\r\n|\n|\r)/gm, "");

				file.contents = new Buffer(contents.replace(templateUrlRegExp, 'template: \''+templateInOneLine+'\''));

				cb(error, file);
			});
		}
		else {
			cb(error, file);
		}


	});
};
