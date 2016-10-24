'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('commsSpinTheWheel');
var commsSpinTheWheelHelper = require('./comms-spin-the-wheel-helper');

app.launch(function(req, res) {
  var prompt = 'To get a random team by spinning the wheel, tell me when you are Ready.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('commsSpinTheWheel', {
	'slots' : {
		'ISREADY': 'ISREADYCODE'
	},
	'utterances': ['{-|ISREADY}']
},
	function(req, res) {
		var readyCode = req.slot('ISREADY');
		var reprompt = 'Tell me if you are ready.';

		if(_.isEmpty(readyCode)) {
			var prompt = 'I didn\'t hear your response. Tell me if you are ready.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		} else {
			console.log(readyCode);

			try{
				var provider = new commsSpinTheWheelHelper();
				console.log(provider);
				var response = provider.getRandomTeamResponse();
				console.log(response);

				res.say(response).send();
			} catch (err) {
				console.log(err.statusCode);
				res.say('Hmmm, not sure what happened but I got lost.').reprompt('Tell me if you want to spin it again.').shouldEndSession(false).send();
			}

			// provider.getRandomTeamResponse().then(function(responseMessage) {
			// 	console.log(responseMessage);
			// 	res.say(responseMessage).send();
			// }).catch(function(err) {
			// 	console.log(err.statusCode);
			// 	res.say('Hmmm, not sure what happened but I got lost.').reprompt('Tell me if you want to spin it again.').shouldEndSession(false).send();
			// });
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