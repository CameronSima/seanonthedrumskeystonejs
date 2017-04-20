var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		upcomingShows: [],
		news: []
	}

	view.on('init', function(next) {
		keystone.list('Show').model.find()
		.sort('date')
		.exec(function(err, results) {
			if (err || !results.length) {
				return next(err)
			}
			var upcoming = results.filter(function(show) {
				return show.upcoming;
			})

			// Return 4 post-filtered shows, even though we only display 3
			// so we know whether to include the 'More' link.
			// Using .(limit) limits the number of total shows, whether
			// they are upcoming or not.
			locals.data.upcomingShows = upcoming.slice(0, 4);
			next();
		})
	})

	view.on('init', function(next) {
		keystone.list('Post').model.find()
		.sort('-publishedDate')
		.limit(4)
		.exec(function(err, results) {
			if (err || !results.length) {
				return next(err)
			}
			locals.data.news = results;
			next();
		})
	})

	// Render the view
	view.render('index');
};
