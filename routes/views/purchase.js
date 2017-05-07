var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('init', function(next) {

		var Order = new keystone.List('Order').model;
		Order.customer = req.body.customer;
		Order.products = req.body.products;

	Order.products = req.body.products;  


		Order.save(function(err, order) {
			if (err) {
				next(err);
			}
			next();
		})
	})
}