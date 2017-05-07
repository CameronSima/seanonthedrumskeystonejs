var pp = require('tiny-paypal');

exports = module.exports = {

	var url;

	if (process.env.NODE_ENV == 'production') {
		url = process.env.URL;
	} else {
		url = process.env.port;
	};

	function initiate(res) {
		pp.init({
			CLIENT_ID: process.env.CLIENT_ID
			CLIENT_SECRET: process.env.CLIENT_SECRET
			SUCCESS_CALLBACK_URL: 'https://' + url + '/payment-success',
			CANCELED_CALLBACK_URL: 'https://' + url + '/payment-canceled',
			SANDBOX: true,  // leave false for production
		});

		pp.createPayment(total, 'US', 'Sean McGuinness')
		.then(function(result) {
			console.log("Payment ID:", result.id);
			console.log("Redirect URL", result.redirect);  // Redirect your client's browser to this URL
			console.log("Info URL", result.get);  // Get the payment info from this URL
			console.log("Execute URL", result.execute); 

			res.redirect(result.redirect)
		});
		.catch(function(err) {
			console.log(err)
		})
	}

	function execute(req) {
		pp.executePayment(req.query.paymentId, req.query.token, req.query.PayerID)
		.catch(function(err) {
			console.log(err);
		})
	}
}