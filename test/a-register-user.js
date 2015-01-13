// var assert = require("assert")
var request = require('supertest');

describe('Register User', function(done){
	//this.timeout(3000);

	describe('try to create user with no values', function(){
		it('should return 401', function (done) {
		  request(sails.hooks.http.app)
		    .post('/user')
		    .send()
		    .expect(200, done);
		});
	})
})

