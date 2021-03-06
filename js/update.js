
function setup(){
	for (var i = 0; i < players.length; i++) {
		checkInventoryIsArray();
		// Set Initial HP and Mana
		setHP(i, getMaxHP(i));
		setMana(i, getMaxMana(i));
		//setXP(i);

		var player = getPlayerFromID(i + 1);		
		var thisClass = getClassFromPlayer(i);
		
		player.abilities = {
			ab1 : [thisClass.abilities.AB1, 0],
			ab2 : [thisClass.abilities.AB2, 0],
			ab3 : [thisClass.abilities.AB3, 0],
			ab4 : (thisClass.classname == "Mago") ? [thisClass.abilities.AB4, 0] : null,
			ab5 : (thisClass.classname == "Mago") ? [thisClass.abilities.AB5, 0] : null,
			ab6 : (thisClass.classname == "Mago") ? [thisClass.abilities.AB6, 0] : null
		}		
	}
	DBUpdatePlayer();
}

// --- DB Updates --- //

function DBUpdatePlayer(){
	$.post({
        url: "update/updatePlayer.php",
        data: {	players: JSON.stringify(players)}
	    }).done(function(response){
	    	//log(response);
	    });
}

// ------- //


function updateFields(){
	for (var i = 0; i < players.length; i++) {
		updateHPBar(i);
		updateManaBar(i);
		updateXPBar(i);
		updateInventory(i);
		updateEquipAll(i);
	}
	initialiseTooltips();
	
}



// Updates the data on the screen depending on how it chances locally
function updateLocal(){
	updateStats();
	updateBuffs();
    
}

// Updates the data on the Database depending on how it changes locally
function updateServer(){

}



function updateStats(){
	for (var i = 0; i < players.length; i++) {
	  var j = i + 1;
	  $(".player" + j).html(players[i].name);
	  $(".class" + j).html(players[i].class);
	  $(".race" + j).html(players[i].race);
	  $(".lvl" + j).html("LVL " + players[i].level);
	  $(".p" + j + " > tr > .vitBase").html(parseInt(players[i].stats.VIT));
	  $(".p" + j + " > tr > .forBase").html(parseInt(players[i].stats.FORZ));
	  $(".p" + j + " > tr > .agiBase").html(parseInt(players[i].stats.AGI));
	  $(".p" + j + " > tr > .intBase").html(parseInt(players[i].stats.INTE));
	  $(".p" + j + " > tr > .volBase").html(parseInt(players[i].stats.VOL));
	  $(".p" + j + " > tr > .temBase").html(parseInt(players[i].stats.TEM)); //+ parseInt(getBaseStats(players, i, 'TEM')));
	  $(".p" + j + " > tr > .sagBase").html(parseInt(players[i].stats.SAG));

	  $(".p" + j + " > tr > .vitBonus").html(parseInt(getBonusStats(i, statName.vit)));
	  $(".p" + j + " > tr > .forBonus").html(parseInt(getBonusStats(i, statName.forz)));
	  $(".p" + j + " > tr > .agiBonus").html(parseInt(getBonusStats(i, statName.agi)));
	  $(".p" + j + " > tr > .intBonus").html(parseInt(getBonusStats(i, statName.inte)));
	  $(".p" + j + " > tr > .volBonus").html(parseInt(getBonusStats(i, statName.vol)));
	  $(".p" + j + " > tr > .temBonus").html(parseInt(getBonusStats(i, statName.tem)));
	  $(".p" + j + " > tr > .sagBonus").html(parseInt(getBonusStats(i, statName.sag)));

	  $(".p" + j + " > tr > .vitTotal").html(parseInt(getTotalStats(i, statName.vit)));
	  $(".p" + j + " > tr > .forTotal").html(parseInt(getTotalStats(i, statName.forz)));
	  $(".p" + j + " > tr > .agiTotal").html(parseInt(getTotalStats(i, statName.agi)));
	  $(".p" + j + " > tr > .intTotal").html(parseInt(getTotalStats(i, statName.inte)));
	  $(".p" + j + " > tr > .volTotal").html(parseInt(getTotalStats(i, statName.vol)));
	  $(".p" + j + " > tr > .temTotal").html(parseInt(getTotalStats(i, statName.tem)));
	  $(".p" + j + " > tr > .sagTotal").html(parseInt(getTotalStats(i, statName.sag)));
	}
}

function updateBuffs(){
	// Empty the buffs class div
	// Insert divs with the new buffs/debuffs
		
	$(".buffs").html("");
	for (var i = 0; i < players.length; i++) {
		if (players[i].buffs != null && players[i].buffs != "") {
			var buffs = players[i].buffs;
			if (!isJson(players[i].buffs)) {
				buffs = JSON.parse(players[i].buffs);
			}
			
			for (var j = 0; j < buffs.length; j++) {
				var name = getBuffName(buffs[j]);
				if (name != null) {			
					var divString = '<div class="buff tooltipped" data-position="top" data-delay="40" data-tooltip="'+ name +'" href="#">'; 
					nexti = i + 1;
					$(".x" + nexti + " .buffs").append(divString + '<img src="img/buffs/' + buffs[j] + '.png">' + '</div>');
				}
			}
		}
	}
}

//		 addStat(string, int, int)
function addStat(stat, value, playerID){
	var player = getPlayerFromID(playerID);
	var old = player.stats[stat];
	player.stats[stat] = value + parseInt(player.stats[stat]);
	console.log(getPlayerFromID(playerID).name + "'s base " + stat + " " + old + " -> " + player.stats[stat]);

	DBUpdatePlayer();
    updateLocal();
}

//		 removeStat(string, int, int)
function removeStat(stat, value, playerID){

	addStat(stat, -value, playerID);
}

function placePlayers(){
	for (var i = 0; i < players.length; i++) {
		var j = i + 1;
		var div = '<h5 class="center player' + j + '">Player Name</h5> <div class="center"><span class="class' + j + '"> </span> | <span class="race' + j + '"> </span></div><br><div class="card nopadding hpmargin"><div class="card-content"> <div class="hpbar"><div class="hp hp' + j + '"><div class="hpn hpn' + j + '">' + getHP(i) + '/' + getMaxHP(i) + '</div></div> </div> <div class="manabar"><div class="mana mana' + j + '"><div class="manan manan' + j + '">' + getMana(i) + '/' + getMaxMana(i) + '</div></div></div> <div class="xpbar"><div class="xp xp' + j + '"><div class="xpn xpn' + j + '">' + getXP(i) + '/' + getMaxXP(i) + '</div></div></div></div></div>';
		div += '<div class="card"> <div class="card-content"><span class="card-title grey-text text-darken-4 center valign center-block lvl' + j + '">LVL</span> <p> <table class="highlight">';
		div += '<thead> <tr> <th data-field="stat">Stat</th> <th data-field="statbase">Base</th> <th data-field="statbuff">Buff</th> <th data-field="stattotal">Total</th> </tr></thead> <tbody class="boldcol p' + j + ' center"> <tr> <td>VIT</td><td class="vitBase">1</td><td class="vitBonus">1</td><td class="vitTotal">1</td></tr><tr> <td>FOR</td><td class="forBase">1</td><td class="forBonus">1</td><td class="forTotal">1</td></tr><tr> <td>AGI</td><td class="agiBase">1</td><td class="agiBonus">1</td><td class="agiTotal">1</td></tr><tr> <td>INT</td><td class="intBase">1</td><td class="intBonus">1</td><td class="intTotal">1</td></tr><tr> <td>VOL</td><td class="volBase">1</td><td class="volBonus">1</td><td class="volTotal">1</td></tr><tr> <td>TEM</td><td class="temBase">1</td><td class="temBonus">1</td><td class="temTotal">1</td></tr><tr> <td>SAG</td><td class="sagBase">1</td><td class="sagBonus">1</td><td class="sagTotal">1</td></tr></tbody> </table> </p></div></div>';
		
		$('.players .playerData' + j).append(div);

		var adiv = '<div class="card armorCard"><div class="card-content armor"> <span class=" grey-text text-darken-4 center-block center"> Armor </span> <p class="text-darken-4 center-block center">' + getBaseArmor(i) + '<span class="bonus"> + ' + getBonusArmor(i) + '</span> (' + getDamageReduction(getTotalArmor(i)) + '%)</p> ';
		adiv += '<span class="smalltext">DF ' + getDF(i) + '	-	DE ' + getDE(i) + '	<br>	RB ' + getRB(i) + '	-	RC ' + getRC(i) + '	-	RI ' + getRI(i) + '	<br>	Tossicità ' + getTOX(i) + '</span>'
		adiv += '</div></div>';
		$('.players .playerArmor' + j).append(adiv);
		
		var idiv = '<div class="card itemsCard"><div class="card-content items"> <span class=" grey-text text-darken-4 center-block center"> Inventory </span> <p class="text-darken-4 center-block center">' + getInventoryAsHTML(i) + '</p> </div></div>';

		$('.players .playerInventory' + j).append(idiv);
		
		var ediv = '<div class="row q"> <div class="col s4 offset-s4 slot head' + j + '"> </div></div><div class="row q"> <div class="col s4 slot ringLeft' + j + '"> <span></span></div><div class="col s4 slot" id="collana' + j + '"> <span></span></div><div class="col s4 slot ringRight' + j + '"> <span></span></div></div><div class="row q"> <div class="col s4 slot weaponLeft' + j + '"> <span></span></div><div class="col s4 slot" id="chest' + j + '"> <span></span></div><div class="col s4 slot weaponRight' + j + '"> <span></span></div></div><div class="row q"> <div class="col s4 slot" id="guanti' + j + '"> <span></span></div><div class="col s4 slot" id="gambe' + j + '"> <span></span></div></div><div class="row q"> <div class="col s4 offset-s4 slot" id="piedi' + j + '"> <span></span></div></div>';
		
		$('.players .playerEquip' + j).append(ediv);
		$('.head' + j).css("background-image", "url(img/slots/helm.png)");
		$('.head' + j).css("background-repeat", "no-repeat");
		$('.head' + j).css("background-position", "center");

		$('.ringLeft' + j).css("background-image", "url(img/slots/ring.png)");
		$('.ringLeft' + j).css("background-repeat", "no-repeat");
		$('.ringLeft' + j).css("background-position", "center");

		$('.ringRight' + j).css("background-image", "url(img/slots/ring.png)");
		$('.ringRight' + j).css("background-repeat", "no-repeat");
		$('.ringRight' + j).css("background-position", "center");

		$('.weaponLeft' + j).css("background-image", "url(img/slots/weapon.png)");
		$('.weaponLeft' + j).css("background-repeat", "no-repeat");
		$('.weaponLeft' + j).css("background-position", "center");

		$('.weaponRight' + j).css("background-image", "url(img/slots/weapon.png)");
		$('.weaponRight' + j).css("background-repeat", "no-repeat");
		$('.weaponRight' + j).css("background-position", "center");

		$('#chest' + j).css("background-image", "url(img/slots/armor.png)");
		$('#chest' + j).css("background-repeat", "no-repeat");
		$('#chest' + j).css("background-position", "center");

		// $('#guanti' + j).css("background-image", "url(img/slots/helm.png)");
		// $('#guanti' + j).css("background-repeat", "no-repeat");
		// $('#guanti' + j).css("background-position", "center");

		$('#collana' + j).css("background-image", "url(img/slots/neck.png)");
		$('#collana' + j).css("background-repeat", "no-repeat");
		$('#collana' + j).css("background-position", "center");

		// $('#piedi' + j).css("background-image", "url(img/slots/helm.png)");
		// $('#piedi' + j).css("background-repeat", "no-repeat");
		// $('#piedi' + j).css("background-position", "center");
	}
}

function updateArmor(playerID){
	for (var i = 0; i < players.length; i++) {
		var j = i + 1;
		var adiv = '<div class="card armorCard"><div class="card-content armor"> <span class=" grey-text text-darken-4 center-block center"> Armor </span> <p class="text-darken-4 center-block center">' + getBaseArmor(i) + '<span class="bonus"> + ' + getBonusArmor(i) + '</span> (' + getDamageReduction(getTotalArmor(i)) + '%)</p>';
		adiv += '<span class="smalltext">DF ' + getDF(i) + '	-	DE ' + getDE(i) + '	<br>	RB ' + getRB(i) + '	-	RC ' + getRC(i) + '	-	RI ' + getRI(i) + '	<br>	Tossicità ' + getTOX(i) + '</span>'
		adiv += '</div></div>';
		$('.players .playerArmor' + j).html(adiv);
	}
}

function updateHPBar(playerID){
	var j = playerID + 1;
	$('.playerData' + j + ' .hpn' + j).html(getHP(playerID) + '/' + getMaxHP(playerID));
	$('.hp' + j).css('width', getHPasPercent(playerID) + '%' );
}

function updateManaBar(playerID){
	var j = playerID + 1;
	$('.playerData' + j + ' .manan' + j).html(getMana(playerID) + '/' + getMaxMana(playerID));
	$('.mana' + j).css('width', getManaasPercent(playerID) + '%' );
}

function updateXPBar(playerID){
	var j = playerID + 1;
	$('.playerData' + j + ' .xpn' + j).html(getXP(playerID) + '/' + getMaxXP(playerID));
	$('.xp' + j).css('width', getXPasPercent(playerID) + '%' );
}

function updateInventory(playerID){
	var j = playerID + 1;
	var idiv = '<div class="card itemsCard" style><div class="card-content items"> <span class=" grey-text text-darken-4 center-block center"> Inventory </span> <p class="text-darken-4 center-block center">' + getInventoryAsHTML(playerID) + '</p> </div></div>';
	$('.players .playerInventory' + j).html("");
	$('.players .playerInventory' + j).append(idiv);

	for (var i = 0; i < players[playerID].inventory.length; i++) {
		var item = players[playerID].inventory[i][0];
		var tooltipData = getItemTooltipHTML(item);
		var id = i + "" + playerID;
		$('.i' + id).addClass('tooltipped');
		$('.i' + id).attr({ 'data-tooltip': tooltipData, 'data-position': 'top' });
		$('.i' + id).attr({ 'onClick': 'itemDialog(' + playerID + ', ' + players[playerID].inventory[i][0] + ')'});
	}
}

function updateEquip(playerID, itemID, slot){
	var j = playerID + 1;
	if (itemID == "" || itemID == null || itemID == JSON.stringify("")) {
		$('.' + slot + j).css('border', '1px solid #FFF');
	} else {
		var c = getRarityColor(getRarity(itemID));
		var tooltipData = getItemTooltipHTML(itemID);
		$('.' + slot + j).css('border', '1px solid ' + c);
		$('.' + slot + j).addClass('tooltipped');
		$('.' + slot + j).attr({ 'data-tooltip': tooltipData, 'data-position': 'top' });
		$('.' + slot + j).attr({ 'onClick': 'itemDialogEquipped(' + playerID + ', ' + itemID + ', "' + slot + '")'});
	}
}

function updateEquipAll(playerID){
	var eq = players[playerID].equip;
	for (var k in eq) {
		if (eq[k] != null && eq[k] != "" && eq[k] != JSON.stringify("")) {
			updateEquip(playerID, eq[k], k);
		}
	}
}

function itemDialog(playerID, itemID){
	var item = getItem(itemID);
	if (item.type == itemType.consumabile) {
		// Consume Modal

	} else if (item.type == itemType.equip) {
		var eq = getEquip(itemID);
		var customSlot = false;
		// Show data changes
		$('#doEquipItem div h4').html("");
		$('#doEquipItem div h4').html(eq.name);

		var changes = getChangesHTML(playerID, itemID);
		$('#doEquipItem div .changes').html(changes);


		// Show Slot choices
		if (eq.slot == slotName.ring) {
			$('#doEquipItem div .changes').append('<br><input name="ring" type="radio" id="ringLeft" /> <label for="ringLeft">Anello di Sinistra</label>');
			$('#doEquipItem div .changes').append('<br><input name="ring" type="radio" id="ringRight" /> <label for="ringRight">Anello di Destra</label>');
			customSlot = true;
		}

		// Add click functionality
		$('#doEquip').attr("onClick", "checkSlotSelected(" + playerID + ", " + itemID + ", '" + eq.slot + "', " + customSlot + ")");

		// Show the dialog modal
		$('#doEquipItem').openModal();
	} 
	else if (item.type == itemType.arma) {
		var ar = getArma(itemID);

		// Show data changes
		$('#doEquipItem div h4').html("");
		$('#doEquipItem div h4').html(ar.name);

		var changes = getChangesHTML(playerID, itemID);
		$('#doEquipItem div .changes').html(changes);

		// Show Slot choices
		
		$('#doEquipItem div .changes').append('<br><input name="weapon" type="radio" id="weaponRight" /> <label for="weaponRight">Arma di Sinistra</label>');
		$('#doEquipItem div .changes').append('<br><input name="weapon" type="radio" id="weaponLeft" /> <label for="weaponLeft">Arma di Destra</label>');
		customSlot = true;
	

		// Add click functionality
		$('#doEquip').attr("onClick", "checkSlotSelected(" + playerID + ", " + itemID + ", '" + slotName.weapon + "', " + customSlot + ")");

		// Show the dialog modal
		$('#doEquipItem').openModal();
	}
	initialiseTooltips();
}

function itemDialogEquipped(playerID, itemID, slotx){
	var item = getItem(itemID);
	if (item.type == itemType.equip) {
		var eq = getEquip(itemID);
		
		var customSlot = false;
		if (slotx == slotN.ringLeft || slotx == slotN.ringRight || slotx == slotN.weaponLeft || slotx == slotN.weaponRight) {
			customSlot = true;
		}

		// Show data
		$('#doUnequipItem div h4').html("");
		$('#doUnequipItem div h4').html(eq.name);

		// Add click functionality
		$('#doUnequip').attr("onClick", "unequipItem(" + playerID + ", '" + slotx + "')");

		// Show the dialog modal
		$('#doUnequipItem').openModal();
	}
	initialiseTooltips();
}

function checkSlotSelected(playerID, itemID, slot, customSlot){
	if (!customSlot) {
		for(k in slotName){
			if (slotName[k] == slot) {
				equipItem(playerID, itemID, slotN[k]);
			}
		}
		//equipItem(playerID, itemID, slot);
		$('#doEquipItem').closeModal();
	} else if (customSlot) {
		if (slot == slotName.ring){
			var id = $("input[name=ring]:checked").attr('id');
			if (id != null) {
				equipItem(playerID, itemID, id);
				$('#doEquipItem').closeModal();
			} else { 
				log("Missing selection")
			}		
		} else if (slot == slotName.weapon){
			var id = $("input[name=weapon]:checked").attr('id');
			if (id != null) {
				equipItem(playerID, itemID, id);
				$('#doEquipItem').closeModal();
			} else { 
				log("Missing selection")
			}	
		}
	}
	initialiseTooltips();
	updateFields();
	log(players[playerID].equip)
}