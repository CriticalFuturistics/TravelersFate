(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function initialiseTooltips(){
	$(document).ready(function(){
	    $('.tooltipped').tooltip({delay: 40});
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

	for (var i = 0; i < activeBuffs.length; i++) {
		var b = getBuff(activeBuffs[i+1]);
		if (b != null) {
			// Test if the string is JSON validated. If not, make it so
			if (!isJson(b.effect)) {
				log("JSON number " + i + " is not a JSON. Parsing...");
				b.effect = JSON.parse(b.effect);
			}

			if (isJson(b.effect)) {

				var fx = JSON.parse(b.effect);
				if (fx.isAura == true){
					// Apply this buff to every other player
				}
				if (fx.hasOwnProperty("stat")) {
					if (fx.stat == true) {
						if (fx.hasOwnProperty("statMod")) {
							return fx.statMod[stat];
						}
					}
				}
			}
		}
	}
	return 0;
}
function getArmor(playerID){
	var p = getPlayerFromID(playerID);
	return parseInt(p.armor) + getArmorFromBuffs(playerID);
}

function getArmorFromBuffs(playerID) {
	var p = getPlayerFromID(playerID);

	for (var i = 0; i < p.buffs.length; i++) {
		var b = getBuff(p.buffs[i+1]);
		if (b != null) {
			// Test if the string is JSON validated. If not, make it so
			if (!isJson(b.effect)) {
				log("JSON number " + i + " is not a JSON. Parsing...");
				b.effect = JSON.parse(b.effect);
			}

			if (isJson(b.effect)) {
				var fx = JSON.parse(b.effect);
				if (fx.isAura == true){
					// Apply this buff to every other player
				}
				if (fx.hasOwnProperty("armor")) {
					var bonusArmor = 0;
					
					if (fx.hasOwnProperty("armorMod")) {
						if (fx.armorMod.indexOf("Furia") !== -1) {
							var modIndex = getIndex("Furia*32");
							var ability = fx.armorMod.substring(0, modIndex-1);
							var mod = fx.armorMod.substring(modIndex+1, fx.armorMod.length-1);

							if (modIndex == "*") {
								bonusArmor += mod; // * getAbilityLevel("Furia")
							} else if (modIndex == "/"){
								bonusArmor += mod; // / getAbliltyLevel("Furia")
							}
						}

					}
					return parseInt(bonusArmor);
				}
			}
		}
	}
	return 0;
}

function getIndex(s){
	for (var i = 0; i < s.length; i++) {
		if (s[i] == "*" || s[i] == "/") { 
			return i;
		}
	}
	return s.length;
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
		} 
	}
	return null;
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

function isJson(item) {
    try {
    	var test = JSON.parse(item);
    } catch(e) {
    	return false;
    }
    return true;
}

function getAbilityLevel(playerID, ab){
	/*for (var i = 0; i < classes.length; i++) {
		if (classes[i].classname == getClassFromPlayer(playerID)){
			for (var i = 0; i < classes.abilities.length; i++) {
					if (classes.abilities['AB' + i] == ab){
						return classes.abilities['AB' + i];
					}
				}
		}
	}
	return 0;*/

	log(classes[getClassFromPlayer(playerID)]);
}
//getAbilityLevel('Furia');



// Useful constants

const statName = {
	vit: "VIT",
	for: "FOR",
	agi: "AGI",
	int: "INT",
	vol: "VOL",
	tem: "TEM",
	sag: "SAG"
}

function log(str){
	console.log(str);
}