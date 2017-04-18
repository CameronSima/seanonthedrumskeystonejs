var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'shows';
	locals.data = {
		shows: {
			future: [],
			past: []
		}
	}

	view.on('init', function(next) {
		keystone.list('Show').model.find()
		.sort('date')
		.exec(function(err, results) {
			if (err || !results.length) {
				return next(err)
			}
			locals.data.shows.future = results.filter(function(show) {
				return show.upcoming;
			});

			locals.data.shows.past = results.filter(function(show) {
				return show.upcoming = false;
			})
			next();
		})
	})

	view.render('shows');
}