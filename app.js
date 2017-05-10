let express = require('express');
let app = express();

app.get('/', function(request, response) {
	// throw 'Error';
	response.send('OK');
});

app.get('/cities', function(request, response) {
	let cities = ['Mesa', 'Portland', 'Fargo'];
	// response.json('OK');
	response.json(cities);
});

// app.listen(3000);
module.exports = app;	// do it this way, as a module, so that we can write tests using app