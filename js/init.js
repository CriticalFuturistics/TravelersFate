(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function initialiseTooltips(){
	$(document).ready(function(){
	    $('.tooltipped').tooltip({delay: 50});
	  });
}

function getPlayerFromID(id){
	for (var i = 0; i < players.length; i++) {
		if (players[i].ID == id){
			return players[i];
		}
	}
	return null;
}

function getBaseStats(players, playerNumber, stat) {
	if (playerNumber <= players.length) {
		for (var key in players[playerNumber].stats){
			if (key == stat) {
	    		var statValue = players[playerNumber].stats[key];
	    		var raceStats = getStatFromRace(getRaceFromPlayer(players, playerNumber), stat);
	    		var classStats = getStatFromClass(getClassFromPlayer(players, playerNumber), stat);
	    		return parseInt(statValue) + parseInt(raceStats) + parseInt(classStats);
	    	}
	    } return undefined;
	} else {
		return undefined;
	}
}

// Return the total number of a Stat at the time
function getTotalStats(players, playerNumber, stat){
	
	return getBaseStats(players, playerNumber, stat) + getBonusStats(players, playerNumber, stat);
}

function getBonusStats(players, playerNumber, stat){
	return getBaseStats(players, playerNumber, stat) + getStatFromBuffs(players, playerNumber, stat) + getStatFromItems(players, playerNumber, stat);
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

// Returns the Race the player as a String
function getRaceFromPlayer(players, playerNumber) {
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == players[playerNumber].race) {
			return races[i].racename;
		}
	}
	return undefined;
}

// Returns the Class the player as a String
function getClassFromPlayer(players, playerNumber) {
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].classname == players[playerNumber].class) {
			return classes[i].classname;
		}
	}
	return undefined;
}

// Returns the race stats Sto come i party
function getStatFromRace(race, stat){
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == race){
			return races[i].stats[stat];	
		}
	}
	return undefined;	
}
 
// Returns the race stats Sto come i party
function getStatFromClass(classX, stat){
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].classname == classX){
			return classes[i].stats[stat];	
		}
	}
	return undefined;	
}

function getBuff(id){
	for (var i = 0; i < buffs.length; i++) {
		if (buffs[i].ID == id) {
			return buffs[i];
		} else return null;
	}
}

function getBuffName(id){
	var buff = getBuff(id);
	if (buff == null) {
		return null;
	}
	return buff.name;
}



function getKeysArray(fields){
	var array = [];
	for (var key in fields) {
    	array.push(fields[key]);
	}
	return array;
}




// Usefull constants

const statName = {
	vit: "VIT",
	for: "FOR",
	agi: "AGI",
	int: "INT",
	vol: "VOL",
	tem: "TEM",
	sag: "SAG"
}