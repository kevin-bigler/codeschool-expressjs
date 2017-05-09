let express = require('express');
let app = express();

app.get('/', (request, response) => {
	throw 'Error';
	// response.send('OK');
});


// app.listen(3000);
module.exports = app;