function handleLocalDB(){
	setupDB();
}

function setupDB(){
	db = openDatabase("DB", "1.0", "DB", 10 * 1024 * 1024);
	db.transaction(function(txt) {
    	txt.executeSql(queryCreate(playersColumns, "players"));
    	//txt.executeSql("INSERT INTO Contatti (" + addKeys(playersColumns) + ") VALUES ('1', 'zyke', 'Womu', 'Guerriero', '1', '2', '2', '2', '2', '2', '2', '2', 'anerghndjsf', 'nsdg', 'jnsdf')");
    	txt.executeSql("INSERT INTO Contatti (" + addKeys(playersColumns) + ") VALUES (" + addKeys(playersColumns) + ")");
    });

}




// Updates the data on the screen depending on how it chances locally
function updateLocal(){
	updateStats();

    
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
	  $(".p" + j + " > tr > .vitBase").html(parseInt(players[i].stats.VIT) + parseInt(getBaseStats(players, i, 'VIT')));
	  $(".p" + j + " > tr > .forBase").html(parseInt(players[i].stats.FOR) + parseInt(getBaseStats(players, i, 'FOR')));
	  $(".p" + j + " > tr > .agiBase").html(parseInt(players[i].stats.AGI) + parseInt(getBaseStats(players, i, 'AGI')));
	  $(".p" + j + " > tr > .intBase").html(parseInt(players[i].stats.INT) + parseInt(getBaseStats(players, i, 'INT')));
	  $(".p" + j + " > tr > .volBase").html(parseInt(players[i].stats.VOL) + parseInt(getBaseStats(players, i, 'VOL')));
	  $(".p" + j + " > tr > .temBase").html(parseInt(players[i].stats.TEM) + parseInt(getBaseStats(players, i, 'TEM')));
	  $(".p" + j + " > tr > .sagBase").html(parseInt(players[i].stats.SAG) + parseInt(getBaseStats(players, i, 'SAG')));

	  $(".p" + j + " > tr > .vitBonus").html(parseInt(getBonusStats(players, i, 'VIT')));
	  $(".p" + j + " > tr > .forBonus").html(parseInt(getBonusStats(players, i, 'FOR')));
	  $(".p" + j + " > tr > .agiBonus").html(parseInt(getBonusStats(players, i, 'AGI')));
	  $(".p" + j + " > tr > .intBonus").html(parseInt(getBonusStats(players, i, 'INT')));
	  $(".p" + j + " > tr > .volBonus").html(parseInt(getBonusStats(players, i, 'VOL')));
	  $(".p" + j + " > tr > .temBonus").html(parseInt(getBonusStats(players, i, 'TEM')));
	  $(".p" + j + " > tr > .sagBonus").html(parseInt(getBonusStats(players, i, 'SAG')));

	  $(".p" + j + " > tr > .vitTotal").html(parseInt(getTotalStats(players, i, 'VIT')));
	  $(".p" + j + " > tr > .forTotal").html(parseInt(getTotalStats(players, i, 'FOR')));
	  $(".p" + j + " > tr > .agiTotal").html(parseInt(getTotalStats(players, i, 'AGI')));
	  $(".p" + j + " > tr > .intTotal").html(parseInt(getTotalStats(players, i, 'INT')));
	  $(".p" + j + " > tr > .volTotal").html(parseInt(getTotalStats(players, i, 'VOL')));
	  $(".p" + j + " > tr > .temTotal").html(parseInt(getTotalStats(players, i, 'TEM')));
	  $(".p" + j + " > tr > .sagTotal").html(parseInt(getTotalStats(players, i, 'SAG')));
	}
}

