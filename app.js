let express = require('express');
let app = express();

app.use(express.static('public'));

let cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;	// do it this way, as a module, so that we can write tests using app