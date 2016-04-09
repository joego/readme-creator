'use strict';

var fs = require('fs');
var readline = require('readline');
var content = '';

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var createReadme = {
	start: function () {
		this.title();
	},
	title: function () {
		var _this = this;
		rl.question('title: (Title) ', function(answer) {
			content += "#" + ((answer) ? answer : "Title");
			_this.description();
		});
	},
	description: function () {
		var _this = this;
		rl.question('description: ', function (answer) {
			content += "\n" + answer;
			_this.install();
		});
	},
	install: function () {
		var _this = this;
		rl.question('install command: (npm install) ', function(answer) {
			content += "\n##Install\n\t\t" + ((answer) ? answer : "npm install");
			_this.end();
		});
	},
	end: function () {
		fs.writeFile(__dirname+'/README.md', content, function (err) {
			if (err)
				return console.log(err);
			else
				console.log('README.md created');
		});
		rl.close();
	}
};
createReadme.start();