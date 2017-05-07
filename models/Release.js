var keystone = require('keystone');
var Types = keystone.Field.Types;

var Release = new keystone.List('Release', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Release.add({
	title: { type: String, required: true },
	releaseDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	description: { type: String },
	price: { type: Types.Money }
});

Release.relationship({ ref: 'Order', path: 'products' });

Release.register();