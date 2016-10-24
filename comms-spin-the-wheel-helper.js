'use strict';
var Random = require('random-js');
var _ = require('lodash');
var commsTeams = require('./comms-teams');

function commsSpinTheWheelHelper() {}

commsSpinTheWheelHelper.prototype.getRandomNumber = function(array_size) {
	if(array_size <= 0) {
		return -1;
	}

	var engine = Random.engines.mt19937().autoSeed();
	// We'll want to return within 0 and array_size - 1 as the array we'll enumerate will be 0 based.
	var distribution = Random.integer(0, array_size - 1); 
	return distribution(engine);

	// var randomValue = Math.floor(Math.random() * (array_size - 0));
	//console.log('Random value: ' + randomValue);
	// return randomValue;
};

commsSpinTheWheelHelper.prototype.getAllTeams = function() {
	return commsTeams;
};

commsSpinTheWheelHelper.prototype.getRandomTeamAt = function(index) {
	return commsTeams[index];
};

commsSpinTheWheelHelper.prototype.getRandomTeam = function() {
	var randomNumber = this.getRandomNumber(commsTeams.length);
	return this.getRandomTeamAt(randomNumber);
};

commsSpinTheWheelHelper.prototype.getRandomTeamResponse = function() {
	var chosen_team = this.getRandomTeam();
	var template = _.template("I spinned the wheel and out of ${total_teams} teams, the random team selected is ${team}. " +
	"Yes, Team ${team}.");

	return template({
		total_teams: commsTeams.length,
		team: chosen_team
	});
}

module.exports = commsSpinTheWheelHelper;