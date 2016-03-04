// Description:
//   automatically generate a setlist based on provided members
//
// Dependencies:
//   lodash
//
// Configuration:
//   None
//
// Commands:
//   hubot what are the parts for [song] - returns the parts for the following song, if no match returns a list of songs to try
//   hubot who sings [part] on [song] - returns who sings what on what song
//	 hubot I'm missing rehearsal [when] because [reason]
// 


var _ 	= require('lodash');

var songs = {
	'Seven': {
		'Solo 1': ['Sam W'],
		'Solo 2': ['Will S'],
		'Solo 3': ['Peter'],
		'Solo 4': ['Josiah'],
		'Asshole': ['Brendan L'],
		'T1': ['Reid, Rob P', 'Brendan L'],
		'T2': ['Robert L', 'Josiah', 'Will C'],
		'Baritone': ['Sam K', 'Brendan G', 'Sam W', 'Frankie'],
		'Bass': ['Ben', 'Will S', 'Peter', 'Sam G'],
		'VP': ['Josiah', 'Peter']
	},
	'Boys': {
		'Solo 1': ['Robert L'],
		'Solo 2': ['Jesse'],
		'Solo 3': ['Sam G'],
		'Solo 4': ['Reid'],
		'T1': ['Robert P', 'Reid', 'Brendan L'],
		'T2': ['Robert L', 'Will C', 'Jesse', 'Josiah'],
		'Baritone': ['Sam K', 'Sam W', 'Frankie', 'Brendan G'],
		'Bass': ['Ben', 'Will S', 'Peter'],
		'VP': ['Peter']
	},
	'Feeling Good': {
		'Solo 1': ['Stephen'],
		'T1 Top': ['Reid', 'Brendan L'],
		'T1 Bottom': ['Robert P'],
		'T2 Top': ['Robert L'],
		'T2 Bottom': ['Jesse'],
		'Baritone': ['Josiah', 'Sam K'],
		'Bass 1 Top': ['Brendan G', 'Frankie'],
		'Bass 1 Bottom': ['Will S'],
		'Bass': ['Ben', 'Sam G', 'Peter'],
		'VP': ['Peter']
	},
	'Human Nature': {
		'Solo': ['Frankie'],
		'T1': ['Reid', 'Robert P'],
		'T2 Top': ['Josiah', 'Will C'],
		'T2 Bottom': ['Robert L', 'Brendan L', 'Brendan G'],
		'Baritone Top': ['Frankie', 'Jesse'],
		'Baritone Bottom': ['Sam K', 'Sam W'],
		'Bass': ['Ben', 'Sam G', 'Will S', 'Peter'],
		'VP': ['Peter']
	},
	'Sweater Weather': {
		'Solo': ['Jesse'],
		'T1 Top': ['Reid'],
		'T1 Bottom': ['Robert L', "Brendan L"],
		'T2 Top': ['Robert P'],
		'T2 Bottom': ['Josiah', 'Will C'],
		'Baritone Top': ['Frankie'],
		'Baritone Bottom': ['Brendan', 'Sam W'],
		'Bass Top': ['Sam K', 'Peter'],
		'Bass Bottom': ['Will S', 'Ben', 'Sam G'],
		'VP': ['Peter', 'Ben']		
	},
	'Ave Maria': {
		'Solo': ['Robert L', 'Brendan L', 'Will C', 'Reid', 'Sam K'],
		'T1': ['Reid', 'Robert L', 'Robert P', 'Brendan L'],
		'T2': ['Josiah', 'Jesse', 'Brendan', 'Will C'],
		'Baritone': ['Sam K', 'Frankie', 'Sam W'],
		'Bass': ['Will S', 'Peter', 'Sam G', 'Ben']
	},
	'PTM': {
		'Solo': ['Josiah', 'Stephen', 'Jesse'],
		'T1': ['Reid', 'Brendan L'],
		'T2': ['Will C', 'Robert L'],
		'Baritone 1 Top': ['Robert P', 'Josiah'],
		'Baritone 1 Bottom': ['Jesse, Frankie'],
		'Baritone 2': ['Brendan G', 'Sam W'],
		'Bass 2': ['Will S', 'Ben', 'Sam G'],
		'VP': ['Peter']
	},
	'Spiderman': {
		'Solo': ['Sam'],
		'T1': ['Brendan L', 'Reid', "Robert P"],
		'T2': ['Robert L', 'Josiah'],
		'T3': ['Brendan', 'Jesse'],
		'Baritone': ['Peter', 'Frankie', 'Will C'],
		'Bass': ['Sam G', 'Sam W', 'Will S', 'Ben'],
		'VP': ['Peter']
	},
	'Mirrors': {
		'Solo': ['Reid'],
		'T1': ['Robert P', 'Brendan L'],
		'T2 Top': ['Robert L'],
		'T2 Bottom': ['Will C'],
		'T3 Top': ['Jesse'],
		'T3 Bottom': ['Frankie', 'BG'],
		'Baritone': ['Sam K'],
		'Bass 1': ['Sam W', 'Peter'],
		'Bass 2': ['Sam G', 'Ben', 'Will S'],
		'VP': ['Peter']
	},
	'Use Somebody': {
		'Solo': ['Robert L'],
		'T1': ['Reid', 'Robert P'],
		'T2 Top': ['Jesse', 'Brendan L'],
		'T2 Bottom': ['Robert L'], 
		'T3 Top': ['Will C', 'Frankie'],
		'T3 Bottom': ['Josiah'],
		'Bass 1 Top': ['Sam W', 'Brendan G'],
		'Bass 1 Bottom': ['Sam K', 'Peter'],
		'Bass 2': ['Sam G', 'Ben', 'Will S'],
		'VP': ['Peter'],
	},
	'Cry Me A River': {
		"Solo" : ["Josiah"],
		"T1" : ["Reid", 'Brendan L'],
		"T2 Top" : ["Robert L"],
		"T2 Bottom" : ["Will C", "Frankie"],
		"T3" : ["Robert P"],
		"Bari 1" : ["Sam", "Jesse"],
		"Bari 2 Top" : ["Brendan", "Josiah"],
		"Bari 2 Bottom" : ["Will S"],
		"Bari 3" : ["Sam W"],
		"Bass" : ["Ben", "Sam G", "Peter"],
		"VP" : ["Peter"]
	},
	'Stitches': {
		"Solo" : ["Will C"],
		"T1" : [
		"Robert P",
		"Reid",
		"Brendan L"
		],
		"T2" : [
		"Brendan G",
		"Robert L"
		],
		"T3" : [
		"Josiah",
		"Jesse",
		"Frankie"
		],
		"Bari" : [
		"Sam K",
		"Sam W"
		],
		"Bass" : [
		"Sam G",
		"Peter",
		"Will S",
		"Ben"
		],
		"VP" : ["Josiah"],
	},
	'Star Spangled Banner': {
		'T1 Top': ['Reid'],
		'T1 Bottom': ['Robert P', 'Brendan L'],
		'T2 Top': ['Will C', 'Jesse'],
		'T2 Bottom': ['Robert L', 'Josiah'],
		'Baritone Bottom': ['Sam W'],
		'Baritone Top': ['Sam K', 'Frankie'],
		'Bass Top': ['Will S', 'Peter'],
		'Bass Bottom': ['Sam G', 'Ben']
	},
	'Drift Away': {
		'Solo': ['Robert P'],
		"T1 Top": ['Reid', 'Brendan L'],
		"T1 Bottom" : [
		"Robert L"
		],
		"T2 Top" : [
		"Robert P",
		"Josiah",
		],
		'T2 Bottom': [
		"Will C",
		"Jesse"
		],
		"Baritone 1 Top" : [
		'Frankie',
		],
		'Baritone 1 Bottom': [
		'Brendan G'
		],
		"Baritone 2 Top" : [
		"Sam K",
		],
		'Baritone 2 Bottom': [
		'Sam W'
		],
		"Bass" : [
		"Will S",
		"Ben",
		"Sam G"
		],
		"VP" : "Peter",
		"Solo" : "RP"
	},
	'Brick': {
		"Solo": ["Robert L"],
		"T1 Top": [
		'Reid'
		],
		"T1 Bottom" : [
		"Brendan L",
		"Robert L"
		],
		"T2 Top" : ["Josiah"],
		'T2 Bottom': [ 'Jesse'],
		"T3" : [
		"Stephen",
		"Will C"
		],
		"Baritone Top" : [
		'Robert P', 'Brendan G'
		],
		'Baritone Bottom': [
		"Sam K",
		"Frankie"
		],
		"Bass" : [
		"Sam W",
		"Ben",
		"Sam G",
		"Will S"
		],
		"VP" : ["Peter"],
		"Solo" : ["Brendan G"]
	},
	'Me and Mrs Jones': {
		'Solo': ['Robert L'],
		'T1 Top': ['Brendan L'],
		'T1 Bottom': ['Robert P', 'Robert L'],
		'T2 Top': ['Reid', 'Stephen'],
		'T2 Bottom': ['Will C', 'Josiah'],
		'Baritone Top': ['Brendan G'],
		'Baritone Bottom': ['Jesse', 'Frankie'],
		'Bass 1 Top': ['Sam K', 'Peter'],
		'Bass 1 Bottom': ['Sam W'],
		'Bass 2': ['Will S', 'Ben', 'Sam G'],
		'VP': ['???'] 
	},
	'Run To You': {
		'Soprano': ['???'],
		'Alto': ['???'],
		'Tenor': ['???'],
		'Baritone': ['???'],
		'Bass': ['???'],
	},
	'Aleluia': {
	},
	'If I Ever': {
		'Solo': ['Jesse', 'Stephen'],
	},
	'You Send Me': {
		'Solo': ['Brendan G']
	},
	'In The Still of the Night': {
		'Solo': ['Jesse', 'Frankie']
	}
}

var songNames = Object.keys(songs);


module.exports = function(robot) {
//   hubot setlist name, name, name - returns a list of songs which can be performed with the
/*
	robot.respond(/setlist (.*)/i, function(res){
		var names = res.match[1].split(/, ?/);
		var performable = [];

		_.each(songs, function(song, parts) {
			var numParts = 0;
			var performableParts = 0;
			_.each(parts, function(part, singers) {
				_.intersection(names, singers);
			});
		});
	});
*/

	robot.respond(/I.*m missing rehearsal ?(.*) because (.+)/i, function(res) {
		var when = res.match[1];
		var reason = res.match[2];

		var broadcast = res.message.user.name + " is missing rehearsal " + when + " because " + reason;
		robot.send({
			room: 'officers'
		}, broadcast);

		res.reply("Got it, thanks " + res.message.user.name);
	});

	robot.respond(/what are the parts for (.+)/i, function(res){
		var song = res.match[1];

    	if (!(song in songs)) {
    		res.reply("No such song: " + song + "\nPick one of:\n" + songNames.join('\n'));
    		return;
    	}

    	var parts = songs[song];
    	var reply = 'Parts for ' + song + ':\n';
		Object.keys(parts).forEach(function(part) {
			reply += part;
			reply += '\t';
			reply += parts[part].join(', ');
			reply += '\n';
    	});

    	res.reply(reply);
    });

	robot.respond(/who sings (\S+) [io]n (.+)/i, function(res){
		console.log(robot, res);
    	// song
    	var part = res.match[1];
    	var song = res.match[2];

    	if (!(song in songs)) {
    		res.reply("No such song: " + song + "\nPick one of:\n" + songNames.join('\n'));
    		return;
    	}

    	if (!(part in songs[song])) {
    		res.reply("No such part. Pick one of:\n" + Object.keys(songs[song]).join('\n'));
    		return;
    	}

    	res.reply(songs[song][part].join(", "));
    });




}
