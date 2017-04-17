var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		upcomingShows: []
	}

	view.on('init', function(next) {
		keystone.list('Show').model.find()
		.sort('date')
		.exec(function(err, results) {
			if (err || !results.length) {
				return next(err)
			}
			console.log(results)
			var upcoming = results.filter(function(show) {
				return show.upcoming;
			})
			locals.data.upcomingShows = upcoming;
			next();
		})
	})

	// Render the view
	view.render('index');
};
