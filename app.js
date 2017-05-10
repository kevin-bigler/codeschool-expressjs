let express = require('express');
let app = express();

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	let cities = ['Mesa', 'Portland', 'Fargo'];
	response.json(cities);
});

app.post('/cities', function (req, res) {
	res.sendStatus(201);
});

module.exports = app;	// do it this way, as a module, so that we can write tests using app