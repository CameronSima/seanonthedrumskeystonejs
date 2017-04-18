var keystone = require('keystone');
var Types = keystone.Field.Types;

var Show = new keystone.List('Show', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title' },
});

Show.add({
	title: { type: String, required: true },
	date: { type: Types.Date, initial: true, required: true },
	band: { type: String  },
	link: { type: Types.Url },
	description: { type: String, height: 300 },
	location: {
		city: { type: String },
		venue: { type: String }
	},
	otherBands: { type: Types.TextArray }

});

Show.schema.virtual('upcoming').get(function() {
	return this.date > new Date();
})

Show.schema.virtual('playingWith').get(function() {
	if (this.otherBands.length) {

		if (this.otherBands.length == 1) {
			return 'with ' + this.otherBands + '.';
		}

		var bands = this.otherBands;
		var last = bands.pop();
		return 'with ' + bands.join(', ') + ' and ' + last + '.';	
	} else {
		return
	}

})

Show.register();