/**
* Renders pages. Split into separate file as it used
* by server and grunt task.
*/

var fs = require('fs'),
	swig = require('swig'),
	pkg = require('./package.json'),

	templateDir = pkg.project.source + '/templates',
	docsTemplateDir = pkg.project.docs + '/templates',
	dataDir = './' + pkg.project.source + '/templates/data',
	docsDataDir = './' + pkg.project.docs + '/templates/data';

swig.setDefaults({
	cache: false
});

function getPageIndexData(){

	var inner = function(path, urlBase){

		var nav = [],
			files;

		if(fs.statSync(path).isDirectory()){

			files = fs.readdirSync(path);

			files.forEach(function(file){

				if(fs.statSync(path + '/' + file).isDirectory()){
					nav.push({
						title: capitaliseAndSpacify(file),
						url: urlBase + '/' + file,
						type: 'directory',
						subNav: inner(path + '/' + file, urlBase + '/' + file)
					});
				}
				else if(fs.statSync(path + '/' + file).isFile()){
					nav.push({
						title: capitaliseAndSpacify(file.replace(/\.(.*)$/, '')),
						url: urlBase + '/' + file,
						type: 'file'
					});
				}
			});
		}

		return nav;
	};

	return inner(__dirname + '/source/templates/pages', '/pages');
}

function capitaliseAndSpacify(str){
	var split = str.split('-');

	split = split.map(function(item){
		return item.charAt(0).toUpperCase() + item.substr(1);
	});

	return split.join(' ');
}

module.exports = {

	getIndex: function(data){
		var tmpl = docsTemplateDir + '/pages/index.html',
			data = data || {};

		data.page = pkg;
		data.global = require(docsDataDir + '/global');
		template = swig.compileFile(tmpl);

		return template(data);
	},

	getPageIndex: function(data){
		var tmpl = docsTemplateDir + '/pages/page-index.html',
			data = data || {};

		data.page = pkg;
		data.page.pages = getPageIndexData();
		data.global = require(docsDataDir + '/global');
		template = swig.compileFile(tmpl);

		return template(data);
	},

	getPage: function(url, data){
		var tmpl = templateDir + url,
			data = data || {},
			template;

		try{
			data.page = require(dataDir + '/' + url.replace(/\.html$/, ''));
		}
		catch(e){}

		data.global = require(dataDir + '/global');

		template = swig.compileFile(tmpl);
		return template(data);
	}

};
