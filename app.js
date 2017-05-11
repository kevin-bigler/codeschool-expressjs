let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let urlencode = bodyParser.urlencoded({ extended: false });

let reddis = require('redis');
let client = reddis.createClient();

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${NODE_ENV}`);
client.select(NODE_ENV.length);

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	client.hkeys('cities', function(error, names) {
		response.json(names);
	});
});

app.post('/cities', urlencode, function (req, res) {
	let newCity = req.body;

	if (!newCity.name || !newCity.description) {
		res.sendStatus(400);
		return false;
	}

	client.hset('cities', newCity.name, newCity.description, function(error) {
		if (error) throw error;

		res.status(201).json(newCity.name);
	});
});

app.delete('/cities/:name', function (req, res) {
  client.hdel('cities', req.params.name, function(error) {
		if (error) throw error;
		res.sendStatus(204);
	});
});

module.exports = app;	// do it this way, as a module, so that we can write tests using app