(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

function initialiseTooltips(){
	$(document).ready(function(){
	    $('.tooltipped').tooltip({delay: 40, html: true});
	    $('select').material_select();
	    $('.modal-trigger').leanModal();
	  });
}

function finish(){



	// Adjust the slots divs
	var w = $('.slot').width();
    $('.slot').css('height', w);
    $('.q').css('margin-bottom', 0);

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

// Return the total number of a Stat
function getTotalStats(playerID, stat){
	return parseInt(players[playerID].stats[stat]) + getBonusStats(playerID, stat);
}

function getBonusStats(playerID, stat){
	return getBaseStats(playerID, stat) + getStatFromBuffs(playerID, stat) + getStatsFromEquip(playerID, stat);
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
							return parseInt(fx.statMod[stat]);
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
function getStatsFromEquip(playerID, stat) {
	var equips = players[playerID].equip;

	//getStatFromItem(12, statName.vit);
	
	var total = 0;
	// TODO

	return parseInt(total);
}

function getStatFromItem(itemID, stat){
	var i = getItem(itemID);
	if (i.type == "Equip"){
		i = getEquip(itemID);
		if (i.hasOwnProperty('fx')) {
			if (i.fx != "") {
				if (typeof i.fx === 'string') {
					i.fx = JSON.parse(i.fx);
				}			
				if (i.fx.hasOwnProperty(stat)) {
					return i.fx[stat];
				}
			}
		}
	}	
  	return 0;
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
	var baseA = 0;
	if (typeof players[playerID].equip === "string") {
		players[playerID].equip = JSON.parse(players[playerID].equip);
	}
	for (var k in players[playerID].equip){
		if (getEquip(players[playerID].equip[k]) != null || getEquip(players[playerID].equip[k]) != undefined) {
			baseA += parseInt(getEquip(players[playerID].equip[k]).armor);
		}
	}

	players[playerID].armor = baseA;
	return players[playerID].armor;
}

function getBonusArmor(playerID){
	return getArmorFromBuffs(playerID);
}


// --- HP, Mana and XP --- //

function setMaxHP(playerID){
	var p = players[playerID];
	p.maxHP = getTotalStats(playerID, statName.vit) * 20 + getTotalStats(playerID, statName.forz) * 4 + getTotalStats(playerID, statName.agi)  * 2;
	return p.maxHP;
}

function setMaxMana(playerID){
	var p = players[playerID];
	p.maxMana = getTotalStats(playerID, statName.inte)  * 20 + getTotalStats(playerID, statName.sag)  * 5;
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
	DBUpdatePlayer();
}

function addMana(playerID, n){
	var p = players[playerID];
	if (p.Mana + n <= getMaxMana(playerID)) {
		p.Mana += n;
	} else {
		p.Mana = getMaxMana(playerID);
	}
	updateManaBar(playerID);
	DBUpdatePlayer();
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
	DBUpdatePlayer();
}

function removeHP(playerID, n){
	var p = players[playerID];
	p.HP = p.HP - n;
	updateHPBar(playerID);
	DBUpdatePlayer();
}

function removeMana(playerID, n){
	var p = players[playerID];
	p.Mana = p.Mana - n;
	if (p.Mana < 0) {
		p.Mana = 0;
	}
	updateManaBar(playerID);
	DBUpdatePlayer();
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
	// TODO
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

// --- Elemental Defences and Resistances --- //
function getDF(playerID){
	return players[playerID].DF;
}
function getDE(playerID){
	return players[playerID].DE;
}
function getRB(playerID){
	return players[playerID].RB;
}
function getRC(playerID){
	return players[playerID].RC;
}
function getRI(playerID){
	return players[playerID].RI;
}
function getTOX(playerID){
	return players[playerID].TOX;
}

// --- Items and Inventory Management --- //

function getInventoryAsHTML(playerID){
	var inv = getInventory(playerID);
	var html = '<table  class="highlight inv" data-delay="40"> <thead> <tr> <th data-field="type"><i class="material-icons">layers</i></th>';
	html += '<th data-field="name">Nome</th>';
	//html += '<th data-field="amount">No.</th>';
	html += '<th data-field="weight">Peso</th> </tr></thead><tbody>';
	
	for (var i = 0; i < inv.length; i++) {
		var item = getItem(inv[i][0]);
		var quantity = inv[i][1];
		var id = i + "" + playerID;
		html += ' <tr class="i' + id + '"> <td>' + getItemIcon(item.ID) + '</td> <td>' + quantity + ' ' + item.name + '</td> <td>' + item.weight * quantity + '</td> </tr>';
	}
	html += '</tbody></table>';
	return html;
}

function getItemIcon(itemID){
	var type = items[itemID].type;
	if (type == "Consumabile") {
		return '<i class="material-icons">fiber_manual_record</i>';
	} else if (type == 'Equip') {
		return '_'
	}
	return "_";	// TODO
}

function getInventory(playerID){
	return players[playerID].inventory;
}

function getItem(itemID){
	for (var i = 0; i < items.length; i++) {
		if (items[i].ID == itemID) {
			return items[i];
		}
	}
	return null;
}

function addItem(playerID, itemID){
	var p = players[playerID];
	players[playerID].inventory.push([itemID, 1]);
}

function removeItem(playerID, itemID){
	for (var i = 0; i < players[playerID].inventory.length; i++) {
		if (players[playerID].inventory[i][0] == itemID){
			players[playerID].inventory.splice(i, 1);
		}
	}
	updateInventory(playerID);
}

function equipItem(playerID, itemID, slot){
	if (getItem(itemID).type == "Equip" || getItem(itemID).type == "Arma") {
		var p = players[playerID];
		if (p.equip[slot] != null && p.equip[slot] != "") {
		
			addItem(playerID, p.equip[slot]);
		}
		p.equip[slot] = itemID;
		removeItem(playerID, itemID);
		updateEquip(playerID, itemID, slot);
		updateArmor(playerID);
		DBUpdatePlayer();
	} else {
		log("You can't equip something other than a weapon or a piece of armor");
	}
}

function unequipItem(playerID, slot){
	var p = players[playerID];
	if (!isSlotEmpty(playerID, slot)) {
		addItem(playerID, p.equip[slot]);
		p.equip[slot] = "";
		updateInventory(playerID);
		updateEquip(playerID, p.equip[slot], slot);
		DBUpdatePlayer();
	}
	$('#doUnequipItem').closeModal();
	updateArmor(playerID);
	removeTooltip(playerID, slot);
	updateFields();
}

function isSlotEmpty(playerID, slot){
	var e = players[playerID].equip[slot];
	return (e == null || e == "" || e == JSON.stringify(""));
}

function removeTooltip(playerID, slotx){
	var j = playerID + 1;
	$('.' + slotx + j).removeClass('tooltipped');	// TODO the tooltip is not being removed idk why
	$('.' + slotx + j).removeAttr('data-tooltip');
	$('.' + slotx + j).removeAttr('data-position');
	$('.' + slotx + j).prop( "onclick", null );
}

function getItemTooltipHTML(itemID){
	var item = items[itemID-1];
	var name = '<span class="title">' + item.name + '</span>';
	var p;

	if (item.type == itemType.consumabile) {
		p = '<p class="dex"> Tipo: ' + item.type + '<br> Peso: ' + item.weight + '<br> Prezzo: ' + item.price + ' </p>';
	} else if (item.type == itemType.arma) {
		var armaObj = getArma(item.ID);																														// getFx(itemID); TODO
		p = '<p class="dex"> Tipo: ' + armaObj.type + '<br> Peso: ' + item.weight + '<br> Prezzo: ' + item.price + '<br> Danno: ' + armaObj.dmg + '<br> Effetto: ' + armaObj.fxDex + '<br> PA: ' + armaObj.PA + ' </p>';
	} else if (item.type == itemType.equip) {
		var equipObj = getEquip(item.ID);
		p = '<p class="dex">';
		p += 'Peso: ' + item.weight + '<br>';
		p += 'Prezzo: ' + item.price + '<br>';
		if (equipObj.armor != 0) {
			p += 'Armatura: +' + equipObj.armor + ' <br>';
		}
		if (equipObj.hasOwnProperty('fx')) {
			if (equipObj.fx != "") {
				// Check if it has been parsed before or not
				if (typeof equipObj.fx === 'string') {	
					equipObj.fx = JSON.parse(equipObj.fx);
				}
				var s = "+";
				if (equipObj.fx.hasOwnProperty("VIT")) {
					if (equipObj.fx.VIT < 0) { s = "-"; }
					p += 'VIT: ' + s + ' ' + equipObj.fx.VIT + ' <br>'
				}
				if (equipObj.fx.hasOwnProperty(statName.forz)) {
					if (equipObj.fx.FOR < 0) { s = "-"; }
					p += 'FOR: ' + s + ' ' + equipObj.fx.FOR + ' <br>'	// Non deve essere FORZ
				}
				if (equipObj.fx.hasOwnProperty(statName.agi)) {
					if (equipObj.fx.AGI < 0) { s = "-"; }
					p += 'AGI: ' + s + ' ' + equipObj.fx.AGI + ' <br>'
				}
				if (equipObj.fx.hasOwnProperty(statName.inte)) {
					if (equipObj.fx.INT < 0) { s = "-"; }
					p += 'INT: ' + s + ' ' + equipObj.fx.INT + ' <br>'	// Non deve essere INTE
				}
				if (equipObj.fx.hasOwnProperty(statName.tem)) {
					if (equipObj.fx.TEM < 0) { s = "-"; }
					p += 'TEM: ' + s + ' ' + equipObj.fx.TEM + ' <br>'
				}
				if (equipObj.fx.hasOwnProperty(statName.vol)) {
					if (equipObj.fx.VOL < 0) { s = "-"; }
					p += 'VOL: ' + s + ' ' + equipObj.fx.VOL + ' <br>'
				}
				if (equipObj.fx.hasOwnProperty(statName.sag)) {
					if (equipObj.fx.SAG < 0) { s = "-"; }
					p += 'SAG: ' + s + ' ' + equipObj.fx.SAG + ' <br>'
				}
				if (equipObj.fx.hasOwnProperty('PT')) {
					if (equipObj.fx.PT < 0) { s = "-"; }
					p += 'PT: ' + s + ' ' + equipObj.fx.PT + ' <br>'
				}
			}
		}
		p += '</p>';
	} else if (item.type == itemType.oggetto) {
		p = '<p class="dex"> Tipo: ' + item.type + '<br> Peso: ' + item.weight + '<br> Prezzo: ' + item.price + ' </p>';
	}
 
	return name + p;
}

function checkInventoryIsArray(){
	for (var i = 0; i < players.length; i++) {
		if (typeof players[i].inventory === 'string') {
			players[i].inventory = JSON.parse(players[i].inventory);
		}
	}
}

function getArma(itemID){
	for (var i = 0; i < armi.length; i++) {
		if(armi[i].ID == itemID){
			return armi[i];
		}
	}
	log("Arma con id " + itemID + " non trovata.")
	return null;
}

function getEquip(itemID){
	if (itemID != "" || itemID != null) {
		for (var i = 0; i < equip.length; i++) {
			if(equip[i].ID == itemID){
				return equip[i];
			}
		}
	}
	
	return null;
}

function getChangesHTML(playerID, itemID){
	var item = getItem(itemID);
	var player = players[playerID];
	var p = "";
	if (item.type == itemType.equip){
		p += '<div class="chp"><div class="chpbox"> HP </div><div class="chpDex"> ' + player.HP + '  ->  ' + getNewHP(playerID, itemID) + ' </div></div>';
		p += '<div class="cmana"><div class="cmanabox"> Ma </div><div class="cmanaDex"> ' + player.Mana + '  ->  ' + getNewMana(playerID, itemID) + ' </div></div>';
		p += '<div class="cstats">';

		if (getStatFromItem(itemID, statName.vit) != 0) {
			p += '<div class="cstatsDex"> ' + statName.vit + ' &#09; ' + getTotalStats(playerID, statName.vit) + ' → ' + parseInt(getStatFromItem(itemID, statName.vit) + parseInt(getTotalStats(playerID, statName.vit))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.forz) != 0) {
			p += '<div class="cstatsDex"> ' + statName.forz + ' &#09; ' + getTotalStats(playerID, statName.forz) + ' → ' + parseInt(getStatFromItem(itemID, statName.forz) + parseInt(getTotalStats(playerID, statName.forz))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.agi) != 0) {
			p += '<div class="cstatsDex"> ' + statName.agi + ' &#09; ' + getTotalStats(playerID, statName.agi) + ' → ' + parseInt(getStatFromItem(itemID, statName.agi) + parseInt(getTotalStats(playerID, statName.agi))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.inte) != 0) {
			p += '<div class="cstatsDex"> ' + statName.inte + ' &#09; ' + getTotalStats(playerID, statName.inte) + ' → ' + parseInt(getStatFromItem(itemID, statName.inte) + parseInt(getTotalStats(playerID, statName.inte))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.vol) != 0) {
			p += '<div class="cstatsDex"> ' + statName.vol + ' &#09; ' + getTotalStats(playerID, statName.vol) + ' → ' + parseInt(getStatFromItem(itemID, statName.vol) + parseInt(getTotalStats(playerID, statName.vol))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.tem) != 0) {
			p += '<div class="cstatsDex"> ' + statName.tem + ' &#09; ' + getTotalStats(playerID, statName.tem) + ' → ' + parseInt(getStatFromItem(itemID, statName.tem) + parseInt(getTotalStats(playerID, statName.tem))) + '</div>';
		}
		if (getStatFromItem(itemID, statName.sag) != 0) {
			p += '<div class="cstatsDex"> ' + statName.sag + ' &#09; ' + getTotalStats(playerID, statName.sag) + ' → ' + parseInt(getStatFromItem(itemID, statName.sag) + parseInt(getTotalStats(playerID, statName.sag))) + '</div>';
		}
		p += '</div></p>';
	}
	// For the weapons we add the Damage
	else if (item.type == itemType.arma){
		p += '<div class="chp"><div class="chpbox"> HP </div><div class="chpDex"> ' + player.HP + '  ->  ' + getNewHP(playerID, itemID) + ' </div></div>';
		p += '<div class="cmana"><div class="cmanabox"> Ma </div><div class="cmanaDex"> ' + player.Mana + '  ->  ' + getNewMana(playerID, itemID) + ' </div></div>';
		p += '<div class="cstats">';
		p += '<div class="cstatsDex"> +' + getArma(itemID).dmg+ ' Danni ' + dmgTypeName[getArma(itemID).dmgType] + '</div>';
	}
	return p;
}

function getNewHP(playerID, itemID){
	var p = players[playerID];	
	var newHP = (getStatFromItem(itemID, statName.vit) + getTotalStats(playerID, statName.vit)) * 20 + (getStatFromItem(itemID, statName.forz) + getTotalStats(playerID, statName.forz)) * 4 + (getStatFromItem(itemID, statName.agi) + getTotalStats(playerID, statName.agi)) * 2;
	return newHP;
}

function getNewMana(playerID, itemID){
	var p = players[playerID];	
	var newMana = (getStatFromItem(itemID, statName.inte) + getTotalStats(playerID, statName.inte)) * 20 + (getStatFromItem(itemID, statName.sag) + getTotalStats(playerID, statName.sag)) * 5;
	return newMana;
}


function getRarity(itemID){
	return parseInt(getItem(itemID).rarity);
}

function getRarityColor(n){
	switch(n) {
    case 0:
        return '#111111';
        break;
    case 1:
        return '#3F51B5';
        break;
    case 2:
        return '#FF9800';
        break;
    case 3:
        return '#9C27B0';
        break;
	}
}









// Useful constants

const statName = {
	vit: "VIT",
	forz: "FORZ",
	agi: "AGI",
	inte: "INTE",
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

const slotN = {
	"head":"head",
	"neck":"neck", 
	"ringLeft":"ringLeft", 
	"ringRight":"ringRight", 
	"chest":"chest", 
	"gloves":"gloves", 
	"weaponLeft":"weaponLeft", 
	"weaponRight":"weaponRight", 
	"legs":"legs", 
	"boots":"boots"
}

const slotName = {
	ring: "Anello",
	head: "Testa",
	chest: "Petto",
	gloves: "Guanti",
	legs: "Gambe",
	neck: "Collana",
	chestLegs: "Petto + Gambe",
	weapon: "Arma"
}
/*
const slotNameInverted = {
	"Anello":
	"Testa":
	"Petto":
	"Guanti":
	"Gambe":
	"Collana":
	"Petto + Gambe":
	"Arma":
}
*/
const itemType = {
	valuta: 'valuta',
	consumabile: 'Consumabile',
	arma: 'Arma',
	equip: 'Equip',
	oggetto: 'Oggetto',
}

const dmgTypeName = ['Fisici', 'Fuoco', 'Elettrici', 'Puri'];

const emptyEquip = {"head":"","neck":"","ringLeft":"","ringRight":"","chest":"","gloves":"","weaponLeft":"","weaponRight":"","legs":"","boots":""}

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
