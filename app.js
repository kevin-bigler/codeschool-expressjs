let express = require('express');
let app = express();

app.get('/', (request, response) => {
	response.send('OK');
});


app.listen(3000);