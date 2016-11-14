'use strict';
var Random = require('random-js');
var _ = require('lodash');
var teams = require('./comms-teams');

var commsSeattleTeams = teams.commsSeattleTeams;
var commsChennaiTeams = teams.commsChennaiTeams;
var commsTeams = teams.commsSeattleTeams.concat(teams.commsChennaiTeams);

var site_location;
var locationBasedTeams;

function commsSpinTheWheelHelper(location) {
	site_location = location;

	if(teams.seattleEquivalents.indexOf(location) > -1) {
		console.log('insdie seattle block');
		locationBasedTeams = commsSeattleTeams;
	} else if (teams.chennaiEquivalents.indexOf(location)  > -1) {
		console.log('insdie chennai block');
		locationBasedTeams = commsChennaiTeams;
	} else {
		locationBasedTeams = commsTeams;
		site_location = 'All';
	}

	console.log('Inside helper. Location is ' + site_location + '. And the array is ' + locationBasedTeams);
}

commsSpinTheWheelHelper.prototype.getRandomNumber = function(array_size) {
	if(array_size <= 0) {
		return -1;
	}

	var engine = Random.engines.mt19937().autoSeed();
	// We'll want to return within 0 and array_size - 1 as the array we'll enumerate will be 0 based.
	var distribution = Random.integer(0, array_size - 1); 
	return distribution(engine);
};

commsSpinTheWheelHelper.prototype.getAllTeams = function() {
	return locationBasedTeams;
};

commsSpinTheWheelHelper.prototype.getRandomTeamAt = function(index) {
	return locationBasedTeams[index];
};

commsSpinTheWheelHelper.prototype.getRandomTeam = function() {
	var randomNumber = this.getRandomNumber(locationBasedTeams.length);
	return this.getRandomTeamAt(randomNumber);
};

commsSpinTheWheelHelper.prototype.getRandomTeamResponse = function() {
	var chosen_team = this.getRandomTeam();
	var template = _.template("I spinned the wheel and out of ${total_teams} teams for location ${site_location}, the random team selected is ${team}. " +
	"Yes, Team ${team}.");

	return template({
		total_teams: locationBasedTeams.length,
		site_location: site_location,
		team: chosen_team
	});
}

module.exports = commsSpinTheWheelHelper;