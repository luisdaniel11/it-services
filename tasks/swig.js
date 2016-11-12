var through = require('through2'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-swig';

var swigPlugin = function(options){
	return through.obj(function (file, enc, cb) {

		var error = null,
			path = file.path,
			index = path.indexOf('pages'),
			url = '/pages/',
			html;

		if(index === -1){
			error = new PluginError(PLUGIN_NAME, {
				message: gutil.colors.yellow('Invalid file path'),
				showStack: false
			});
		}
		else{
			url += path.substr(index + 6);
		}

		html = options.renderer.getPage(url, {
			url: url
		});

		file.contents = new Buffer(html);

		cb(error, file);
	});
};

module.exports = swigPlugin;