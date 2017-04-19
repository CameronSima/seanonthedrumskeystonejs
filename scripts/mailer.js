var nodemailer = require('nodemailer');
var keystone = require('keystone');

exports = module.exports = function (contactForm) {

	console.log(contactForm)

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: process.env.EMAIL_BOT_ADDRESS,
	        pass: process.env.EMAIL_BOT_PASS
	    }
	});

	function send() {
		
		// setup email data with unicode symbols
		var mailOptions = {
	    from: '"seanonthedrums.com Email Bot" <' + process.env.EMAIL_BOT_ADDRESS + '>', 
	    to: process.env.SEANS_EMAIL, 
	    subject: "New message from " + contactForm['name.full'], 
	    html: '<p>' + contactForm.message + '</p> ' +
	    			'<br></br>' +
	    			'<p>' + contactForm['name.full'] + '</p>' +
	    			'<p>' + contactForm.email + '</p>' +
	    			'<p>' + contactForm.phone || "" + '</p>'

		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
		});
	}
	console.log(process.env.SEANS_EMAIL)
	send();
}