let express = require('express');
let app = express();

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	let cities = ['Mesa', 'Portland', 'Fargo'];
	response.json(cities);
});

module.exports = app;	// do it this way, as a module, so that we can write tests using app