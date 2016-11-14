'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var commsSpinTheWheelHelper = require('../comms-spin-the-wheel-helper');
chai.config.includeStack = true;

var locations = ['seattle', 'chennai', 'all'];

describe('commsSpinTheWheelHelper', new function() {
	for (var location in locations) {
		testAllForDifferentLocations(location);
	};
});

function testAllForDifferentLocations(location) {
	var provider = new commsSpinTheWheelHelper(location);
	
	describe('#getRandomNumberFromArraySize', function() {
		context('with a call to get a random number within the array size', function() {
			it('returns a random number within 0 and the size of the array', function() {
				var array_size = 15;
				var value = provider.getRandomNumber(array_size);
				console.log('Random value: ' + value);
				return expect(value).to.be.within(0, array_size-1);
			});
		});

		context('with a call to get a random number when array size is zero', function() {
			it('returns -1', function() {
				var array_size = 0;
				var value = provider.getRandomNumber(array_size);
				console.log('Random value: ' + value);
				return expect(value).to.be.equals(-1);
			});
		});

	});

	describe('#getRandomTeam', function() {
		context('with a call to get a team on a certain index', function() {
			it('returns a team available at that index in the array', function() {
				var array_size = provider.getAllTeams().length;

				var random_Number = provider.getRandomNumber(array_size);
				console.log('Random number: ' + random_Number);

				var random_Team = String(provider.getRandomTeamAt(random_Number));
				console.log(random_Team);
				return expect(random_Team).to.not.be.null;
			});
		});

		context('with a call to get a random team', function() {
			it('returns a random team', function() {
				var random_Team = provider.getRandomTeam();
				return expect(random_Team).to.not.be.null;
			});
		});

		context('with a call to get a random team response', function() {
			it('returns a response for random team', function() {
				var array_size = provider.getAllTeams().length;
				var expectedResponse = "I spinned the wheel and out of " + array_size + " teams"; //, the random team selected is ";
				
				var random_Team_Response = provider.getRandomTeamResponse();
				console.log(random_Team_Response);
				return expect(random_Team_Response).to.have.string(expectedResponse);
			});
		});
	});
};