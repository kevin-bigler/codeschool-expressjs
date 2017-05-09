let request = require('supertest');
let app = require('./app');

request(app)
	.get('/')
	.expect(200)
	.end((error) => {
		if (error) throw error;
		console.log('Done');
	});