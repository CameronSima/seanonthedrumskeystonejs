var keystone = require('keystone');
var Types = keystone.Field.Types;

var Show = new keystone.List('Show', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title' }
});

Show.add({
	title: { type: String, required: true },
	band: { type: String},
	description: { type: String },
	location: {
		city: { type: String },
		venue: { type: String }
	},
	otherBands: { type: Types.TextArray },
	date: { type: Types.Date }

});

Show.schema.virtual('upcoming').get(function() {
	return this.date > new Date();
})

Show.schema.virtual('playingWith').get(function() {
	if (this.otherBands) {

		if (this.otherBands.length == 1) {
			return 'with ' + otherBands
		}

		var bands = this.otherBands;
		var last = bands.pop();
		return 'with ' + bands.join(', ') + ' and ' + last;	
	} else {
		return ""
	}

})

Show.register();