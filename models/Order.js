var keystone = require('keystone');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order', {
	map: { name: '_id' }
});

Order.add({
	customer: {
		address: {
			street: { type: String, required: true, initial: false  },
			city: { type: String, required: true, initial: false  },
			state: { type: String, required: true, initial: false  },
			country: { type: String, required: true, initial: false  }
		},
		name: { type: Types.Name, required: true, initial: false }
	},
	status: { type: Types.Select, options: 'shipped, not shipped', default: 'not shipped' },
	products: { type: Types.Relationship, ref: 'Release', many: true },
});

Order.schema.virtual('total', function () {
	return this.products.reduce(function(a, b) {
		return a.price + b.price;
	})
});

Order.register();