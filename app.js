let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let urlencode = bodyParser.urlencoded({ extended: false });

let reddis = require('redis');
let client = reddis.createClient();

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${NODE_ENV}`);
client.select(NODE_ENV.length);

// client.hset('cities', 'Mesa', 'description');
// client.hset('cities', 'Portland', 'description');
// client.hset('cities', 'Fargo', 'description');

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	client.hkeys('cities', function(error, names) {
		response.json(names);
	});
});

app.post('/cities', urlencode, function (req, res) {
	let newCity = req.body;
	// cities[newCity.name] = newCity.description;
	client.hset('cities', newCity.name, newCity.description, function(error) {
		if (error) throw error;

		res.status(201).json(newCity.name);
	});
});

module.exports = app;	// do it this way, as a module, so that we can write tests using app