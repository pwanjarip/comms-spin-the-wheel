'use strict';

//function commsTeams() {}
var commsSeattleTeams = ['Sync Voice',
		'Sync Video',
		'Platform',
		'Campfire',
		'Presence',
		'Async Messaging',
		'Mobile Development'	
	];

var commsChennaiTeams = ['Contacts',
		'Preferences',
		'Idenity',
		'Person ID'
	];

// Location code equivalents
var seattleLocationEquivalentCodes = ['seattle', 'north america', 'washington', 'america', 'americas', 'usa', 'canada', 'ottawa', 'us'];
var chennaiLocationEquivalentCodes = ['chennai', 'madras', 'india', 'not america', 'poland', 'europe'];

module.exports.commsSeattleTeams = commsSeattleTeams;
module.exports.commsChennaiTeams = commsChennaiTeams;

module.exports.seattleEquivalents = seattleLocationEquivalentCodes;
module.exports.chennaiEquivalents = chennaiLocationEquivalentCodes;