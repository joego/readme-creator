#!/usr/bin/env node

var fs = require('fs');
var readline = require('readline');
var package = process.cwd() + '/package.json';
var file = process.cwd() + '/README.md';
var content = '';

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var createReadme = {
	start: function () {
		this.verify();
	},
	verify: function () {
		var _this = this;
		fs.readFile(file, function (err,data) {
			if (data) {
				console.log("README.md already exists");
				process.exit();
			} else {
				_this.title();
			}
		});
	},
	autoTitle: function () {
		var _this = this;
		fs.readFile( package, function (err, data) {
			if (data) {
				var projectData = require(package);
				content += "#" + projectData.name;
				content += "\r\n" + projectData.description + "\r\n";
				_this.install();
			} else {
				_this.manualTitle();
			}
		});
	},
	manualTitle: function () {
		var _this = this;
		rl.question('title: (Title) ', function(answer) {
			content += "#" + ((answer) ? answer : "Title");
			_this.description();
		});
	},
	description: function () {
		var _this = this;
		rl.question('description: ', function (answer) {
			content += "\r\n" + answer + "\r\n";
			_this.install();
		});
	},
	install: function () {
		var _this = this;
		rl.question('install command: (npm install) ', function(answer) {
			content += "\r\n##Install\r\n\t\t" + ((answer) ? answer : "npm install");
			_this.required();
		});
	},
	required: function () {
		var _this = this;
		rl.question('required tools: (browserify, watchify) ', function (tools) {
			content += "\r\n##Required Tools" ;
			if (tools) {
				var arrTools = tools.split(",");
				for (var i = 0; i < arrTools.length; i++) {
					content += "\r\n* "+arrTools[i];
				}
				_this.end();
			} else {
				content += "\r\n* Browserify : http://browserify.org/" +
						"\r\n* Wachtify : https://www.npmjs.com/package/watchify";
				_this.end();
			}
		});
	},
	// TODO: add maintainers list
	// maintainers: function () {
	// 	var _this = this;
	// },
	end: function () {
		fs.writeFile(file, content, function (err) {
			if (err)
				return console.log(err);
			else
				console.log('README.md created');
		});
		rl.close();
	}
};
createReadme.start();