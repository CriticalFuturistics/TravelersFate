
function setup(){
	for (var i = 0; i < players.length; i++) {

		var player = getPlayerFromID(i + 1);
		
		if (player.abilities == "") {
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
		
		/*$.post({				TODO update the abilities on the DB
        url: "update.php",
        data: {	updateType: stat,
        		value: value + parseInt(player.stats[stat]),
        		playerID: playerID
        	}
	    }).done(function(response){
	    	//console.log(response);
	    });*/
	}
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
	  $(".p" + j + " > tr > .forBase").html(parseInt(players[i].stats.FOR));
	  $(".p" + j + " > tr > .agiBase").html(parseInt(players[i].stats.AGI));
	  $(".p" + j + " > tr > .intBase").html(parseInt(players[i].stats.INT));
	  $(".p" + j + " > tr > .volBase").html(parseInt(players[i].stats.VOL));
	  $(".p" + j + " > tr > .temBase").html(parseInt(players[i].stats.TEM)); //+ parseInt(getBaseStats(players, i, 'TEM')));
	  $(".p" + j + " > tr > .sagBase").html(parseInt(players[i].stats.SAG));

	  $(".p" + j + " > tr > .vitBonus").html(parseInt(getBonusStats(i, statName.vit)));
	  $(".p" + j + " > tr > .forBonus").html(parseInt(getBonusStats(i, statName.for)));
	  $(".p" + j + " > tr > .agiBonus").html(parseInt(getBonusStats(i, statName.agi)));
	  $(".p" + j + " > tr > .intBonus").html(parseInt(getBonusStats(i, statName.int)));
	  $(".p" + j + " > tr > .volBonus").html(parseInt(getBonusStats(i, statName.vol)));
	  $(".p" + j + " > tr > .temBonus").html(parseInt(getBonusStats(i, statName.tem)));
	  $(".p" + j + " > tr > .sagBonus").html(parseInt(getBonusStats(i, statName.sag)));

	  $(".p" + j + " > tr > .vitTotal").html(parseInt(getTotalStats(i, statName.vit)));
	  $(".p" + j + " > tr > .forTotal").html(parseInt(getTotalStats(i, statName.for)));
	  $(".p" + j + " > tr > .agiTotal").html(parseInt(getTotalStats(i, statName.agi)));
	  $(".p" + j + " > tr > .intTotal").html(parseInt(getTotalStats(i, statName.int)));
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
	// Add the stat locally
	addStatLocal(stat, value, playerID);

	// Add the stat on the Database
	var player = getPlayerFromID(playerID);
    $.post({
        url: "updateStat.php",
        data: {	stat: stat,
        		value: value + parseInt(player.stats[stat]),
        		playerID: playerID
        	}
    }).done(function(response){
    	//console.log(response);
    });
    updateLocal();
}

//		 removeStat(string, int, int)
function removeStat(stat, value, playerID){

	addStat(stat, -value, playerID);
}

function addStatLocal(stat, value, playerID){
	var player = getPlayerFromID(playerID);
	var old = player.stats[stat];
	player.stats[stat] = value + parseInt(player.stats[stat]);
	console.log(getPlayerFromID(playerID).name + "'s base " + stat + " " + old + " -> " + player.stats[stat]);
}





function placePlayers(){
	//$('.players').html("");

	for (var i = 0; i < players.length; i++) {
		var j = i + 1;
		var div = '<h5 class="center player' + j + '">Player Name</h5> <p class="center class' + j + '"> </p><p class="center race' + j + '"> </p><div class="card"> <div class="card-content">';
		div += '<span class="card-title grey-text text-darken-4 center valign center-block lvl' + j + '">LVL</span> <p> <table class="highlight">';
		div += '<thead> <tr> <th data-field="stat">Stat</th> <th data-field="statbase">Base</th> <th data-field="statbuff">Buff</th> <th data-field="stattotal">Total</th> </tr></thead> <tbody class="boldcol p' + j + ' center"> <tr> <td>VIT</td><td class="vitBase">1</td><td class="vitBonus">1</td><td class="vitTotal">1</td></tr><tr> <td>FOR</td><td class="forBase">1</td><td class="forBonus">1</td><td class="forTotal">1</td></tr><tr> <td>AGI</td><td class="agiBase">1</td><td class="agiBonus">1</td><td class="agiTotal">1</td></tr><tr> <td>INT</td><td class="intBase">1</td><td class="intBonus">1</td><td class="intTotal">1</td></tr><tr> <td>VOL</td><td class="volBase">1</td><td class="volBonus">1</td><td class="volTotal">1</td></tr><tr> <td>TEM</td><td class="temBase">1</td><td class="temBonus">1</td><td class="temTotal">1</td></tr><tr> <td>SAG</td><td class="sagBase">1</td><td class="sagBonus">1</td><td class="sagTotal">1</td></tr></tbody> </table> </p></div></div>';
		
		$('.players .playerData' + j).append(div);

		var adiv = '<div class="card armorCard" style><div class="card-content armor"> <span class=" grey-text text-darken-4 center-block center"> Armor </span> <p class="text-darken-4 center-block center">' + getBaseArmor(i) + '<span class="bonus"> + ' + getBonusArmor(i) + '</span> (' + getDamageReduction(getTotalArmor(i)) + '%)</p> </div></div>';

		$('.players .playerArmor' + j).append(adiv);
	}
}