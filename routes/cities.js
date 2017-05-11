let express = require('express');

let bodyParser = require('body-parser');
let urlencode = bodyParser.urlencoded({ extended: false });

// Redis
let reddis = require('redis');
let client = reddis.createClient();

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV: ${NODE_ENV}`);
client.select(NODE_ENV.length);
// end Redis

let router = express.Router();

router.route('/')
	.get(function(request, response) {
		client.hkeys('cities', function(error, names) {
			response.json(names);
		});
	})
	.post(urlencode, function (req, res) {
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

router.route('/:name')
	.delete(function (req, res) {
	  client.hdel('cities', req.params.name, function(error) {
			if (error) throw error;
			res.sendStatus(204);
		});
	})
	.get(function (req, res) {

	  client.hget('cities', req.params.name, function(error, description) {
			if (error) throw error;

			if (description === null) {
				res.sendStatus(404);
				return false;
			}

			res.render('show.ejs', {
				city: {
					name: req.params.name,
					description
				}
			});
		});

	});

module.exports = router;