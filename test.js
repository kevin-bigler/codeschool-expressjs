let request = require('supertest');
let app = require('./app');

let redis = require('redis');
let client = redis.createClient();

client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function() {

	it('Returns a 200 status code', function(done) {

		request(app)
			.get('/')
			.expect(200, done);

	});

	it('Returns an HTML format', function(done){

		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);

	});

	it('Returns an index file with "Cities"', function(done){

		request(app)
			.get('/')
			.expect(/cities/i, done);
	});

});


describe('Creating new cities', function(){

	before('Clear database', function(done) {
		client.flushdb(done);
	});

	afterEach('Clear database', function(done){
		client.flushdb(done);
	});


	it('Returns a 201 status code', function(done){
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+Simpsons+live')
			.expect(201, done);
	});

	it('Returns the city name', function(done){
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+Simpsons+live')
			.expect(/springfield/i, done);
	});

	it('Validates city name and description', function(done){
		request(app)
			.post('/cities')
			.send('name=&description=')
			.expect(400, done);
	});


});

describe('Deleting cities', function(){

	before('Add Banana test data', function(done){
		client.hset('cities', 'Banana', 'a tasty fruit', done);
	});

	afterEach('Clear database', function(done){
		client.flushdb(done);
	});

	it('Returns a 204 status code', function(done){

		request(app)
			.delete('/cities/Banana')
			.expect(204, done);

	});

});


describe('Listing cities on /cities', function(){

	before('Clear database', function(done){
		client.flushdb(done);
	});


	it('Returns 200 status code', function(done){

		request(app)
			.get('/cities')
			.expect(200, done);

	});

	it('Returns JSON format', function(done){

		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done);

	});

	it('Returns initial cities', function(done){

		request(app)
			.get('/cities')
			.expect(JSON.stringify([]), done);

	});

});


describe('Showing city info', function(){

	before(function(done){
		client.hset('cities', 'Marvin', 'quite the Marshian', done);
	});

	after(function(done){
		client.flushdb(done);
	});

	it('Returns 200 status code', function(done){

		request(app)
			.get('/cities/Marvin')
			.expect(200, done);

	});

	it('Returns HTML format', function(done){

		request(app)
			.get('/cities/Marvin')
			.expect('Content-Type', /html/, done);

	});

	it('Returns information for given city', function(done){

		request(app)
			.get('/cities/Marvin')
			.expect(/marshian/i, done);

	});

	it('Returns 404 status code for non-existent city', function(done){

		request(app)
			.get('/cities/fake')
			.expect(404, done);

	});



});



