var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		release: {}
	}
 
	view.on('init', function  (next) {

		keystone.list('Release').model.findOne({
			title: req.params.release
		})
		.exec(function(err, result) {
			if (err) {
				next(err)
			}
			locals.data.release = result;
			next()
		})
	})

	view.render('release');
}