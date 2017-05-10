let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let urlencode = bodyParser.urlencoded({ extended: false });

let cities = {
	'Mesa': '',
	'Portland': '',
	'Fargo': ''
};

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	response.json(Object.keys(cities));
});

app.post('/cities', urlencode, function (req, res) {
	let newCity = req.body;
	cities[newCity.name] = newCity.description;
	res.status(201).json(newCity.name);
});

module.exports = app;	// do it this way, as a module, so that we can write tests using app