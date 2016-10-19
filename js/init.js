(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function getBaseStats(players, playerNumber, stat) {
	if (playerNumber <= players.length) {
		for (var key in players[playerNumber].stats){
			if (key == stat) {
	    		var statValue = players[playerNumber].stats[key];
	    		var raceStats = getStatFromRace(players, playerNumber, getRaceFromPlayer(players, playerNumber), stat);
	    		return statValue;
	    	}
	    } return undefined;
	} else {
		return undefined;
	}
}
// Return the total number of a Stat at the time
function getTotalStats(players, playerNumber, stat){
	return getValueFromStat(players, playerNumber, stat) + getBonusStats(players, playerNumber, stat);
}

function getBonusStats(players, playerNumber, stat){
	return getStatFromBuffs(players, playerNumber, stat) + getStatFromItems(players, playerNumber, stat);
}

// Rrturns the value of a chosen Stat
function getValueFromStat(players, playerNumber, stat) {
	if (playerNumber <= players.length) {
		for (var key in players[playerNumber].stats){
			if (key == stat) {
	    		return parseInt(players[playerNumber].stats[key]);
	    	}
	    } return undefined;
	} else {
		return undefined;
	}
}

// Scans the active Buffs and Debuffs and returns the total Stat Modifier for the chosen Stat
function getStatFromBuffs(players, playerNumber, stat) {
	var activeBuffs = players[playerNumber].buffs;
	var total = 5;
	// TODO

	return parseInt(total);
}

// Scans the equipped Items and returns the total Stat Modifier for the chosen Stat
function getStatFromItems(players, playerNumber, stat) {
	var items = players[playerNumber].equip;
	var total = 9;
	// TODO

	return parseInt(total);
}

// Returns the Race the player is as a String
function getRaceFromPlayer(player, playerNumber) {
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == players[playerNumber].race) {
			return races[i].racename;
		}
	}
	return undefined;
}

// Returns the race stats Sto come i party
function getStatFromRace(player, playerNumber, race, stat){
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == race){
			return races[i].stats[stat];	
		}
	}
	return undefined;	
}
