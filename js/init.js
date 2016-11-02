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

function getBaseStats(playerID, stat) {
	if (playerID <= players.length) {
		for (var key in players[playerID].stats){
			if (key == stat) {
	    		var statValue = players[playerID].stats[key];
	    		var raceStats = getStatFromRace(getRaceFromPlayer(playerID), stat);
	    		var classStats = getStatFromClass(getClassFromPlayer(playerID).classname, stat);
	    		return parseInt(statValue) + parseInt(raceStats) + parseInt(classStats);
	    	}
	    } return undefined;
	} else {
		return undefined;
	}
}

// Return the total number of a Stat at the time
function getTotalStats(playerID, stat){
	
	return getBaseStats(playerID, stat) + getBonusStats(playerID, stat);
}

function getBonusStats(playerID, stat){
	return getBaseStats(players, playerID, stat) + getStatFromBuffs(playerID, stat) + getStatFromItems(playerID, stat);
}

// Rrturns the value of a chosen Stat
function getValueFromStat(playerID, stat) {
	if (playerID <= players.length) {
		for (var key in players[playerID].stats){
			if (key == stat) {
	    		return parseInt(players[playerID].stats[key]);
	    	}
	    } return undefined;
	} else {
		return undefined;
	}
}

// Scans the active Buffs and Debuffs and returns the total Stat Modifier for the chosen Stat
function getStatFromBuffs(playerID, stat) {
	var activeBuffs = players[playerID].buffs;

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
					if (fx.stat) {
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

function getArmorFromBuffs(playerID) {
	var activeBuffs = players[playerID].buffs;

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
				if (fx.hasOwnProperty("armor")) {
					var bonusArmor = fx.armor;
					 
					if (fx.hasOwnProperty("armorMod")) {

						// If the armor modifier contains "Furia"
						if (fx.armorMod.indexOf("Furia") !== -1) {
							var divisionIndex = getDivisionIndex("Furia*2");
							var ability = fx.armorMod.substring(0, divisionIndex-1);
							var mod = fx.armorMod.substring(divisionIndex+1, fx.armorMod.length-1);

							if (divisionIndex == "*") {
								bonusArmor += mod; // * getAbilityLevel("Furia")
							} else if (divisionIndex == "/"){
								bonusArmor += mod; // / getAbliltyLevel("Furia")
							}
						}
					}
					return bonusArmor;
				}
			}
		}
	}
	return 0;
}

function getDivisionIndex(s){
	for (var i = 0; i < s.length; i++) {
		if (s[i] == "*" || s[i] == "/") { 
			return i;
		}
	}
	return s.length;
}

// Scans the equipped Items and returns the total Stat Modifier for the chosen Stat
function getStatFromItems(playerID, stat) {
	var items = players[playerID].equip;
	var total = 0;
	// TODO

	return parseInt(total);
}

// Returns the Race the player as a String
function getRaceFromPlayer(playerID) {
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == players[playerID].race) {
			return races[i].racename;
		}
	}
	return undefined;
}

// Returns the Class the player as a String
function getClassFromPlayer(playerID) {
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].classname == players[playerID].class) {
			return classes[i];
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
function getStatFromClass(thisClass, stat){
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].classname == thisClass){
			return classes[i].stats[stat];	
		}
	}
	return undefined;	
}

// Returns the Buff object
function getBuff(id){
	for (var i = 0; i < buffs.length; i++) {
		if (buffs[i].ID == id) {
			return buffs[i];
		} 
	}
	return null;
}

// Returns the Buff Name as a string
function getBuffName(id){
	var buff = getBuff(id);
	if (buff == null) {
		return null;
	}
	return buff.name;
}

function getDamageReduction(armor){
	damageReduction = (armor * 0.06)/(sqrt(armor) * 0.02);
	return damageReduction;
}


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
