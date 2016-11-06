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
	
	return players[playerID].stats[stat] + getBonusStats(playerID, stat);
}

function getBonusStats(playerID, stat){
	return getBaseStats(playerID, stat) + getStatFromBuffs(playerID, stat) + getStatFromItems(playerID, stat);
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

						// Test every ability because apparently you can't select the right ability
						$.each(abilityName, function(index, value){
							if (fx.armorMod.indexOf(value) !== -1) {
								var divisionIndex = getDivisionIndex(fx.armorMod);
								var ability = fx.armorMod.substring(0, divisionIndex-1);
								var mod = fx.armorMod.substring(divisionIndex + 1, fx.armorMod.length - 1);

								if (divisionIndex == "*") {
									bonusArmor += mod * getAbilityLevel(playerID, ability);
								} else if (divisionIndex == "/"){
									bonusArmor += mod / getAbilityLevel(playerID, ability);
								}
							}

						});
						
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


function getAbilityLevel(playerID, ability){
	var p = players[playerID];

	if 		(p.abilities.ab1[0] == ability) { return p.abilities.ab1[1]; }
	else if (p.abilities.ab2[0] == ability) { return p.abilities.ab2[1]; }
	else if (p.abilities.ab3[0] == ability) { return p.abilities.ab3[1]; }
	else if (getClassFromPlayer(playerID).classname == "Mago") { 
		if  (p.abilities.ab4[0] == ability) { return p.abilities.ab4[1]; }
	}
	else if (getClassFromPlayer(playerID).classname == "Mago") { 
		if  (p.abilities.ab5[0] == ability) { return p.abilities.ab5[1]; }
	}	
	else if (getClassFromPlayer(playerID).classname == "Mago") { 
		if  (p.abilities.ab6[0] == ability) { return p.abilities.ab6[1]; }
	}
	else return null;
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

// Returns the race stats
function getStatFromRace(race, stat){
	for (var i = 0; i < races.length; i++) {
		if (races[i].racename == race){
			return races[i].stats[stat];	
		}
	}
	return undefined;	
}

// Returns the race stats
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
	if (armor == 0 || armor == 1) {
		return 0;
	}
	damageReduction = Math.floor((armor * 0.06)/(Math.sqrt(armor) * 0.02));
	return parseInt(damageReduction);
}

function getTotalArmor(playerID){
	return getBaseArmor(playerID) + getBonusArmor(playerID);
}

function getBaseArmor(playerID){
	return players[playerID].armor;
}

function getBonusArmor(playerID){
	return getArmorFromBuffs(playerID);
}



// --- HP, Mana and XP --- //

function setMaxHP(playerID){
	var p = players[playerID];
	p.maxHP = getTotalStats(playerID, statName.vit) * 20 + getTotalStats(playerID, statName.for) * 4 + getTotalStats(playerID, statName.agi)  * 2;
	return p.maxHP;
}

function setMaxMana(playerID){
	var p = players[playerID];
	p.maxMana = getTotalStats(playerID, statName.int)  * 20 + getTotalStats(playerID, statName.sag)  * 5;
	return p.maxMana;
}

function setMaxXP(playerID){
	var p = players[playerID];
	p.maxXP = p.level * 100;	// TODO XP Curve
	return p.maxXP;
}


function setHP(playerID, n){
	players[playerID].HP = n;
}

function setMana(playerID, n){
	players[playerID].Mana = n;
}

function setXP(playerID, n){
	players[playerID].XP = n;
}


function getMaxHP(playerID){
	if (players[playerID].maxHP == 0) { return setMaxHP(playerID)}
	return players[playerID].maxHP;
}

function getMaxMana(playerID){
	if (players[playerID].maxMana == 0) { return setMaxMana(playerID)}
	return players[playerID].maxMana;
}

function getMaxXP(playerID){
	if (players[playerID].maxXP == 0) { return setMaxXP(playerID)}
	return players[playerID].maxXP;
}


function getHP(playerID){
	return players[playerID].HP;
}

function getMana(playerID){
	return players[playerID].Mana;
}

function getXP(playerID){
	return players[playerID].XP;
}


function addHP(playerID, n){
	var p = players[playerID];
	if (p.HP + n <= getMaxHP(playerID)) {
		p.HP += n;
	} else {
		p.HP = getMaxHP(playerID);
	}
	updateHPBar(playerID);
}

function addMana(playerID, n){
	var p = players[playerID];
	if (p.Mana + n <= getMaxMana(playerID)) {
		p.Mana += n;
	} else {
		p.Mana = getMaxMana(playerID);
	}
	updateManaBar(playerID);
}

function addXP(playerID, n){
	var p = players[playerID];

	if (p.XP + n < getMaxXP(playerID)) {
		p.XP += n;
	} else {
		var extraXP = Math.abs(n - getMaxXP(playerID));
		levelUp(playerID);
		addXP(playerID, extraXP);
	}
	updateXPBar(playerID);
}

function removeHP(playerID, n){
	var p = players[playerID];
	p.HP = p.HP - n;
	updateHPBar(playerID);
}

function removeMana(playerID, n){
	var p = players[playerID];
	p.Mana = p.Mana - n;
	if (p.Mana < 0) {
		p.Mana = 0;
	}
	updateManaBar(playerID);
}

function getXPForNextLevel(playerID){

	return (parseInt(players[playerID].level) + 1) * 100;
}

function levelUp(playerID){
	var p = players[playerID];
	p.XP = 0;
	p.maxXP = getXPForNextLevel(playerID);
	p.level = parseInt(p.level) + 1;
	updateXPBar(playerID);
	unlockLevel(playerID);
}

function unlockLevel(playerID){
	// Update the unlockable field on the player DB
	// The player's app listen to the field change and unlocks the + and - buttons
}

function getHPasPercent(playerID){
	var p = players[playerID];
	return (p.HP / p.maxHP) * 100;
}

function getManaasPercent(playerID){
	var p = players[playerID];
	return (p.Mana / p.maxMana) * 100;
}

function getXPasPercent(playerID){
	var p = players[playerID];
	return (p.XP / p.maxXP) * 100 ;
}

// --- Items --- //

function getInventoryAsHTML(playerID){
	var inv = getInventory(playerID);
	var html = '<table class="inv"> <thead> <tr> <th data-field="type"><i class="material-icons">layers</i></th>';
	html += '<th data-field="name">Nome</th>';
	//html += '<th data-field="amount">No.</th>';
	html += '<th data-field="weight">Peso</th> </tr></thead>';
	
	for (var i = 0; i < inv.length; i++) {
		var item = getItem(inv[i][0]);
		var quantity = inv[i][1];
		html += '<tbody> <tr> <td>_</td> <td>' + quantity + ' ' + item.name + '</td> <td>' + item.weight * quantity + '</td> </tr>';
	}
	html += '</tbody></table>';
	return html;
}

function getInventory(playerID){
	return JSON.parse(players[playerID].inventory);
}

function getItem(id){
	for (var i = 0; i < items.length; i++) {
		if (items[i].ID == id) {
			return items[i];
		}
	}
	return null;
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

const abilityName = {
	scudi : "Scudi",
	spade : "Spade",
	lance : "Lance",
	martelli : "Martelli",
	asce : "Asce",
	furia : "Furia",
	archi : "Archi",
	balestre : "Balestre",
	armiDaFuoco : "Armi da Fuoco",
	evocazione : "Evocazione",
	manipolazione : "Manipolazione",
	incantamento : "Incantamento",
	fuoco : "Fuoco",
	elettricita : "Elettricità",
	ghiaccio : "Ghiaccio",
	mutaforma : "Mutaforma",
	controlloNaturale : "Controllo Naturale",
	artigli : "Artigli",
	artiMarziali : "Arti Marziali",
	bastoni : "Bastoni",
	spirito : "Spirito",
	furtivita : "Furtività",
	scassinatore : "Scassinatore",
	pugnali : "Pugnali",
	risanazione : "Risanazione",
	rituali : "Rituali",
	maledizioni : "Maledizioni"
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
