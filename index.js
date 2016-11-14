'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('commsSpinTheWheel');
var commsSpinTheWheelHelper = require('./comms-spin-the-wheel-helper');
var commsTeams = require('./comms-teams');

app.launch(function(req, res) {
  var prompt = 'To get a random team by spinning the wheel, tell me which location you want to pick up the team from. You can say "Seattle", "Chennai" or "All".';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('commsSpinTheWheel', {
	'slots' : {
		'LOCATION': 'LOCATIONCODE'
	},
	'utterances': ['{-|LOCATION}']
},
	function(req, res) {
		var locationCode = req.slot('LOCATION');
		var reprompt = 'Tell me the location. "Seattle", "Chennai" or "All".';
		
		if (_.isEmpty(locationCode)) {
			var prompt = 'I didn\'t understand your response.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		} else {
			locationCode = locationCode.toLowerCase();
			console.log(locationCode);

			try{
				var provider = new commsSpinTheWheelHelper(locationCode);
				console.log(provider);
				var response = provider.getRandomTeamResponse();
				console.log(response);

				res.say(response).send();
			} catch (err) {
				console.log(err.statusCode);
				res.say('Hmmm, not sure what happened but I got lost.').reprompt('Tell me if you want to spin it again.').shouldEndSession(false).send();
			}

			return false;
		}
	}
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;