var keystone = require('keystone');
var fs = require('fs');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals
	locals.section = 'releases'
	locals.data = {
		releases: []
	}

	// Get all image filenames from releases folder
	view.on('init', function (next) {
		fs.readdir('public/images/releases/', function(err, files) {
			if (err) {
				console.log(err)
			}
			locals.data.releases = files
			next()
			})
		})

	view.render('releases');
}