$(document).ready(function() {
    $('select').material_select();
  });

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

import './main.html';
import '../lib/buffs.js'

import { Players } 	from '../both/database.js';
import { Buffs } 	from '../both/database.js';
import { Classes } 	from '../both/database.js';
import { Consumables } from '../both/database.js';
import { Equips } 	from '../both/database.js';
import { Global } 	from '../both/database.js';
import { Items } 	from '../both/database.js';
import { Races } 	from '../both/database.js';
import { Weapons } 	from '../both/database.js';
import { Spell } 	from '../both/database.js'

import { playerIDs } from '../both/database.js'

Session.set("hasSessionStarted", false)

// The XP Precision Index dictates how the XP required for the 
// next level is rounded. The higher, the more precise.
// 4 corresponds to 00 -> 25 -> 50 -> 75 increments.
const xpPrecisionIndex = 4;	

// Default Players Data is an array of player objects as they 
// are when the client launches. This data does not update.
var defaultPlayersData = []
for (var i = 1; i <= playerIDs.length; i++) { defaultPlayersData.push(Players.findOne({id : i})) }

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
})

Template.registerHelper('exists',(a)=>{
  return a != null || typeof a != 'undefined'
})

Template.registerHelper('isEqual',(a,b)=>{
  return a == b
})

Template.registerHelper('and',(a,b)=>{
  return a && b
})

Template.registerHelper('or',(a,b)=>{
  return a || b
})

Template.registerHelper('isAdmin', (a)=>{
	return a == "admin"
})

Template.registerHelper('isPositive',(a)=>{
  return a >= 0
})



// ---------------------------- TEMPLATE VARS AND METHODS ---------------------------- //

Template.body.helpers({
	global() {
		return Global.find({})
	},
	turn() {
		if (Global.findOne({}) == null || typeof Global.findOne({}) === 'undefined') {
			return 0
		}
		return Global.findOne({}).turn
	},
	continent() {
		if (Global.findOne({}) == null || typeof Global.findOne({}) === 'undefined') {
			return 'Yuenia'
		}
		return Global.findOne({}).continent
	},
	isDaytime(){
		if (Global.findOne({}) == null || typeof Global.findOne({}) === 'undefined') {
			return true
		}
		return Global.findOne({}).isDaytime
	},

	allBuffs(){
		return Buffs.find({})
	}
})

Template.body.events({
	'click .btn-turn': function () {
		nextTurn()
	},

	'click .btn-buff': function (event) {
		let casterID = parseInt($(event.target).attr("casterID"))

		let buffID = parseInt($(".select-buff[targetID='" + casterID + "']").find(":selected").val())
		if (buffID > 0) {
			applyBuff(buffID, casterID, this.id)
		}	
	},

	'click .lvlup' : function (event){
		let pID = parseInt($(event.target).attr("targetID"))
		let p = Players.findOne({id:pID});
		//gainXP(p, 100)
		resetPlayers()

	}
})

Template.body.rendered = function () {
	// Stuff to load once the page is ready
}

Template.controlPanel.helpers({
	players() {
		let p = Players.find({}, {sort : {id : 1}})
		//updatePlayers()
		init()
		return p
	},

	allBuffs() {
		return Buffs.find({})
	},
	allClasses() {
		return Classes.find({})
	},
	allConsumables() {
		return Consumables.find({})
	},
	allEquips() {
		return Equips.find({})
	},
	// Global doesn't need to be allGlobal, since there is only one
	global() {			
		return Global.find({})
	},
	allItems() {
		return Items.find({})
	},
	allRaces() {
		return Races.find({})
	},
	allWeapons() {
		return Weapons.find({})
	},
})


Template.temSinglePlayer.helpers({
	players() {
		let p = Players.find({})
		//updatePlayers()
		//init()
		return p
	},
	allBuffs() {
		return Buffs.find({})
	},
	allClasses() {
		return Classes.find({})
	},
	allConsumables() {
		return Consumables.find({})
	},
	allEquips() {
		return Equips.find({})
	},
	// Global doesn't need to be allGlobal, since there is only one
	global() {			
		return Global.find({})
	},
	allItems() {
		return Items.find({})
	},
	allRaces() {
		return Races.find({})
	},
	allWeapons() {
		return Weapons.find({})
	},
})


Template.playerData.helpers({
	allBuffs() {
		return Buffs.find({})
	},
	getDamageReduction(){
		return getDamageReduction(Template.parentData(0))
	},
	hpbar(){
		let percent = Math.floor((this.HP / this.maxHP) * 100).toFixed(1)
		$('[playerID=' + this.id + '] .hpbar').css({ width : percent + "%" })
	},
	manabar(){
		let percent = Math.floor((this.mana / this.maxMana) * 100).toFixed(1)
		$('[playerID=' + this.id + '] .manabar').css({ width : percent + "%" })
	},
	xpbar(){
		let percent = Math.floor((this.XP / this.maxXP) * 100).toFixed(1) + 1
		$('[playerID=' + this.id + '] .xpbar').css({ width : percent + "%" })
	},
	pabar(){
		let percent = Math.floor((this.PA / this.maxPA) * 100).toFixed(1)
		$('[playerID=' + this.id + '] .pabar').css({ width : percent + "%" })
	},
})


Template.temBuff.helpers({
	getBuff: function () {
		let b = Buffs.findOne({id : this.valueOf()})
		b.img = "/img/buffs/" + this.valueOf() + ".png"
		return b
	},

	getTurnsLeft(){
		let buffID = this.valueOf()
		let p = Template.parentData(1)
		let index = p.buffs.indexOf(buffID)
		if (p.buffInstances[index] == null || typeof p.buffInstances[index] === 'undefined' ) {
			return 0
		}
		return p.buffInstances[index].turnsLeft 
	},

	getDex: function() {
		let b = Buffs.findOne({id : this.valueOf()})

		let dex = ""
		dex += "<p style='font-size:11pt'><strong>" + b.name + "</strong></p>"

		if (b.fx.isAura) {
			dex += "Un'aura che da <br>"
		} else {
			dex += "Un buff che da <br>"
		}

		if (b.fx.isStatMod) {
			for (var key in b.fx.statMod) {
				if(b.fx.statMod[key] > 0) {
					dex += "+" + b.fx.statMod[key] + " " + key.toUpperCase()
					if (key == "for" ) {
						dex += " (GUZZO PROPRIO) "	// Easter Egg
					}
					dex += "<br>"
				}
			}
			for (var key in b.fx.statMod) {
				if(b.fx.statMod[key] < 0) {
					dex += "-" + b.fx.statMod[key] + " " + key.toUpperCase() + "<br>"
				}
			}
		}
		if (b.fx.isArmorMod) {
			if (b.fx.armor > 0) {
				dex += "+" + b.fx.armor + " Armor <br>"
			} else if (b.fx.armor < 0){
				dex += "ma -" + b.fx.armor + " Armor <br>"
			}
		}
		if (!b.isPermanent) {
			let p = Template.parentData(1)
			dex += "Durata: " + Buff.getTurnsLeft(this.valueOf(), p.id) + "/" + b.duration + " turni"
		}

		return dex
	}
})

Template.temBuff.events({
	'click .buff-remove': function () {
		removeBuff(this.valueOf(), Template.parentData(1).id)
	}
})

Template.temBuff.rendered = function() {

    $('.tooltipped').tooltip()
}


Template.temInventory.helpers({
	inventory: function () {
		let p = Template.parentData(0)
		let t = new Inventory(p)
		return t
	}
})

Template.temSpells.helpers({
	spellbook: function () {
		let p = Template.parentData(0)
		let s = new Spellbook(p)
		return s
	}
})






// ---------------------------- GLOBAL SYSTEM ---------------------------- //

function init(){

	// ONLY activates once the game has started
	if (Global.findOne({}).isGameStart == true) {
		if (!Session.get("hasSessionStarted")) {
			Session.set("hasSessionStarted", true)
			// TODO Update isGameStart to false


			/*
			for (var i = 1; i <= playerIDs.length; i++) {

				let p = Players.findOne({id : i})
				p.HP = p.maxHP
				p.mana = p.maxMana
				p.maxXP = getXPForNextLevel(p.level)
				p.maxPA = getMaxPA(p)	
				p.PA = p.maxPA
				p.maxPT = p.totalStat.for * 15 + p.totalStat.tem * 5
				p.PT = 0

				Meteor.call('player.updateFull', i, p)
			}*/
		}
	}
}

function nextTurn(){
	let players = Players.find({}).fetch()
	for (var p = 0; p < players.length; p++) {
		
		for (var i = 0; i < players[p].buffInstances.length; i++) {

			// Check if the buff is not permanent
			if (!players[p].buffInstances[i].isPermanent){

				// Subtract 1 from the turnsLeft counter
				players[p].buffInstances[i].turnsLeft -= 1

				// Checks if the buff has more turns to go, if not, remove it.
				if(players[p].buffInstances[i].turnsLeft <= 0){ 
					let buffID = players[p].buffInstances[i].buffID
					players[p] = removeBuff(buffID, players[p].buffInstances[i].target)
					//Meteor.call('player.removeBuffs', p.id, buffID)
				}
			}
		}
		Meteor.call('player.updateFull', players[p].id, players[p])

		
	}
	// refill players PA
	// scan buffs for nextTurn effects
	// scan equips for nextTurn effects 
	// scan global for global effects

	// Update the turn on the Global collection
	let g = Global.findOne({})
	g.turn += 1
	Meteor.call('global.update', g);
}

function getCurrentTurn(){

	return Global.findOne({}).turn
}

// ---------------------------- UPDATE SYSTEM ---------------------------- //

function updateMaxHP(pID){

	let p = Players.findOne({ id : pID})
	let h = getMaxHP(p)

	if (h != p.maxHP) {
		Meteor.call('player.updateMaxHP', pID, h, (err, res) => { if (err) { alert(err) } else { console.log(res) }});
	}	
}

function updateMaxMana(pID){
	let p = Players.findOne({ id : pID})
	let m = getMaxMana(p)
	if (m != p.maxMana) {
		Meteor.call('player.updateMaxMana', pID, m, (err, res) => { if (err) { alert(err) } else { console.log(res) }});
	}
}

function updateMaxXP(pID){
	let p = Players.findOne({ id : pID})
	let x = getXPForNextLevel(p.level)
	Meteor.call('player.updateMaxXP', pID, x);
}

function updateMaxPA(pID) {
	let p = Players.findOne({ id : pID})
	let x = getMaxPA(p)

	if (x != p.maxPA) {
		Meteor.call('player.updateMaxPA', pID, x, (err, res) => { if (err) { alert(err) } else { console.log(res) }});
	}	
}

function updateStats(pID){
	let p = Players.findOne({ id : pID})
	//p.stat.for = 0
	//p.totalStat.for = 0
	// Calculate the total stats from Base + Race + Class
	let br = Meteor.myFunctions.fuseStats(p.stat, Meteor.myFunctions.getRaceStats(p, Races))
	let brc = Meteor.myFunctions.fuseStats(br, Meteor.myFunctions.getClassStats(p, Classes))

	// Add the Buff Stats TODO
	let buffStats = {
		"vit" : 0, 
        "for" : 0, 
        "agi" : 0, 
        "int" : 0, 
        "vol" : 0, 
        "tem" : 0, 
        "sag" : 0
	}
	p.totalStat = Meteor.myFunctions.fuseStats(brc, buffStats)	

	//if (p.totalStat == p.totalStat) {
		Meteor.call('player.updateStats', 		pID, p.stat);
		Meteor.call('player.updateTotalStats', 	pID, p.totalStat, 	(err, res) => { if (err) { alert(err) } else { console.log(res) }});
	//}	
}

function updatePlayers(){
	for (var i = 1; i <= playerIDs.length; i++) {
		let p = Players.findOne({id : i})
	 	let pID = p.id

	 	updateStats(pID)
	 	updateMaxHP(pID)
		updateMaxMana(pID)

		p.maxHP = getMaxHP(p)
		p.maxMana = getMaxMana(p)
		p.maxPA = getMaxPA(p)
		p.defences = getDefences(p)
	}
}

// Recalculates the player data based on his stats. 
// It does NOT update:
// level, stats, hp, mana, xp, pt, pa, equip, inventory, buffs and abilities
function updateThisPlayerData(){
	let p = Players.findOne({id : getThisPlayerID()})
	// Add more stuff?

	p.sign = p.sign // TODO Hooks for possible sign change?
	p.maxHP = getMaxHP(p)
	p.maxMana = getMaxMana(p)
	p.maxPA = getMaxPA(p)
	p.defences = getDefences(p)

	Meteor.call('player.updateFull', p.id, p)
}





// ---------------------------- BUFFS SYSTEM ---------------------------- //

// Applies a buff to a player, NOT to a mob
function applyBuff(buffID, casterID, targetID){
	let caster = Players.findOne({id : casterID});
	let target = Players.findOne({id : targetID});

	if (target.isPlayer && caster.isPlayer) {

		// Check if the target isn't already affected by the buff
		if ($.inArray(buffID, target.buffs) == -1) {

			target.buffs.push(buffID)
			target.buffInstances.push(new Buff(buffID, casterID, targetID))

			Meteor.call('player.updateFull', target.id, target)
			return true
		}
		return false
	} else {
		return false
	}
}

// Removes a buff from a player. Returns the new player object without the buff
function removeBuff(buffID, playerID){
	let p = Players.findOne({id : playerID})

	// Check if the players actually has that buff active
	if ($.inArray(buffID, p.buffs) != -1) {	

		// Remove the buff ID from player.buffs
		p.buffs.splice(p.buffs.indexOf(buffID), 1)

		// Remove the buff instance from player.buffInstances
		p.buffInstances.splice(p.buffs.indexOf(buffID), 1)

		Meteor.call('player.updateFull', p.id, p)

		return p
	}

	return null
}





// ---------------------------- LEVELUP SYSTEM ---------------------------- //

// Levels up the player, resetting its XP, increasing MAX XP and updates it on the DB
function gainXP(p, n) {
	if (p.XP + n < p.maxXP) {	p.XP += n 	}
	else {
		let extraXP = Math.abs((p.XP + n) - p.maxXP)
		p.XP = 0
		p.level += 1
		p.maxXP = getXPForNextLevel(p.level)
		displayLevelupDialog(p.id)
		gainXP(p, extraXP)
	}
	Meteor.call('player.updateXP', p.id, p.XP, p.maxXP, p.level)
}

// Display a pop-up dialog to set which stats to increase
// 7 points per level
function displayLevelupDialog(pID){
	
	let p = Players.findOne({id:pID})
	let pts = Global.findOne({id : -1}).ptsPerLvl

	// Makes the modal no closable, so that the user is forced to assign stats
	$('#modalLevelUp').modal({
	    backdrop: 'static',
	    keyboard: false
	})

	$('#modalLevelUp').on('show.bs.modal', function(event) {
		$("#modalLevelUp .modal-title").html("Leveled up " + p.level + " → " + (p.level + 1) + "!")
		
		
	})

	$('#modalLevelUp').modal('show');
}

Template.temLvlUp.helpers({
	pts: function () {
		return Global.findOne({id : getThisPlayerID()}).pts
	},
	lvlStats: function(){
		let obj = Players.findOne({id : getThisPlayerID()}).totalStat
		var result = []
    	for (var key in obj) result.push({name:key.toUpperCase(), value:obj[key]});
		
		return result
	},
	lvlMaxHP: function(){
		return Players.findOne({id : getThisPlayerID()}).maxHP
	},
	lvlMaxMana: function(){
		return Players.findOne({id : getThisPlayerID()}).maxMana
	},
	lvlMaxPA: function(){
		return Players.findOne({id : getThisPlayerID()}).maxPA
	},
	lvlMaxPT: function(){
		return Players.findOne({id : getThisPlayerID()}).maxPT
	},

	lvlDefences: function(){
		return Players.findOne({id : getThisPlayerID()}).defences
	},


	lvlVit(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.vit
	},
	lvlFor(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.for
	},
	lvlAgi(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.agi
	},
	lvlInt(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.int
	},
	lvlVol(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.vol
	},
	lvlTem(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.tem
	},
	lvlSag(){
		return Global.findOne({id : getThisPlayerID()}).newLvlStat.sag
	},


	lvlMaxHPNew() {
		let p = Players.findOne({id : getThisPlayerID()})
		let g = Global.findOne({id : getThisPlayerID()})
		let extraHP = g.newLvlStat.vit * 20 + g.newLvlStat.for * 4 + g.newLvlStat.agi * 2
		return p.maxHP + extraHP
	},

	lvlMaxManaNew() {
		let p = Players.findOne({id : getThisPlayerID()})
		let g = Global.findOne({id : getThisPlayerID()})
		let extraMana = g.newLvlStat.int * 20 + g.newLvlStat.sag * 5
		return p.maxMana + extraMana
	},

	lvlMaxPANew(){
		let p = Players.findOne({id : getThisPlayerID()})
		let g = Global.findOne({id : getThisPlayerID()})
		let extraPA = g.newLvlStat.agi * 10 + g.newLvlStat.int * 4
		return p.maxPA + extraPA
	},

	lvlMaxPTNew(){
		let p = Players.findOne({id : getThisPlayerID()})
		let g = Global.findOne({id : getThisPlayerID()})
		let extraPT = g.newLvlStat.for * 15 + g.newLvlStat.tem * 5
		return p.maxPT + extraPT
	},

	lvlDefencesNew(){
		let p = Players.findOne({id : getThisPlayerID()})
		let g = Global.findOne({id : getThisPlayerID()})
		
		let extraDef = {
	        armor : 0, 
	        DF : 0, 
	        DE : 0, 
	        RB : g.newLvlStat.vol * 1, 
	        RC : g.newLvlStat.for * 4 + g.newLvlStat.vol * 1, 
	        RI : g.newLvlStat.vol * 4, 
	        RS : g.newLvlStat.vit * 4 + g.newLvlStat.vol * 1, 
	        TOX : g.newLvlStat.vol * 1 + g.newLvlStat.tem * 4, 
	        evasion : 0, 
	        precision : 0 
		}

		return Meteor.myFunctions.fuseDefences(p.defences, extraDef)
	}
})

Template.temLvlUp.events({
	'click .lVit': function () {
		let pID = getThisPlayerID()
		let lvlVit = Global.findOne({id: pID}).newLvlStat.vit
		let pts = Global.findOne({id: pID}).pts
		if (lvlVit > 0 && pts >= 0) {
			lvlVit -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "vit", lvlVit, pts)
	},
	'click .mVit': function () {
		let pID = getThisPlayerID()
		let lvlVit = Global.findOne({id: pID}).newLvlStat.vit
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlVit += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "vit", lvlVit, pts)
	},

	'click .lFor': function () {
		let pID = getThisPlayerID()
		let lvlFor = Global.findOne({id: pID}).newLvlStat.for
		let pts = Global.findOne({id: pID}).pts
		if (lvlFor > 0 && pts >= 0) {
			lvlFor -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "for", lvlFor, pts)
	},
	'click .mFor': function () {
		let pID = getThisPlayerID()
		let lvlFor = Global.findOne({id: pID}).newLvlStat.for
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlFor += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "for", lvlFor, pts)
	},

	'click .lAgi': function () {
		let pID = getThisPlayerID()
		let lvlAgi = Global.findOne({id: pID}).newLvlStat.agi
		let pts = Global.findOne({id: pID}).pts
		if (lvlAgi > 0 && pts >= 0) {
			lvlAgi -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "agi", lvlAgi, pts)
	},
	'click .mAgi': function () {
		let pID = getThisPlayerID()
		let lvlAgi = Global.findOne({id: pID}).newLvlStat.agi
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlAgi += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "agi", lvlAgi, pts)
	},

	'click .lInt': function () {
		let pID = getThisPlayerID()
		let lvlInt = Global.findOne({id: pID}).newLvlStat.int
		let pts = Global.findOne({id: pID}).pts
		if (lvlInt > 0 && pts >= 0) {
			lvlInt -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "int", lvlInt, pts)
	},
	'click .mInt': function () {
		let pID = getThisPlayerID()
		let lvlInt = Global.findOne({id: pID}).newLvlStat.int
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlInt += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "int", lvlInt, pts)
	},

	'click .lVol': function () {
		let pID = getThisPlayerID()
		let lvlVol = Global.findOne({id: pID}).newLvlStat.vol
		let pts = Global.findOne({id: pID}).pts
		if (lvlVol > 0 && pts >= 0) {
			lvlVol -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "vol", lvlVol, pts)
	},
	'click .mVol': function () {
		let pID = getThisPlayerID()
		let lvlVol = Global.findOne({id: pID}).newLvlStat.vol
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlVol += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "vol", lvlVol, pts)
	},

	'click .lTem': function () {
		let pID = getThisPlayerID()
		let lvlTem = Global.findOne({id: pID}).newLvlStat.tem
		let pts = Global.findOne({id: pID}).pts
		if (lvlTem > 0 && pts >= 0) {
			lvlTem -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "tem", lvlTem, pts)
	},
	'click .mTem': function () {
		let pID = getThisPlayerID()
		let lvlTem = Global.findOne({id: pID}).newLvlStat.tem
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlTem += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "tem", lvlTem, pts)
	},

	'click .lSag': function () {
		let pID = getThisPlayerID()
		let lvlSag = Global.findOne({id: pID}).newLvlStat.sag
		let pts = Global.findOne({id: pID}).pts
		if (lvlSag > 0 && pts >= 0) {
			lvlSag -= 1
			pts += 1
		}
		Meteor.call('global.updateNewLevel', pID, "sag", lvlSag, pts)
	},
	'click .mSag': function () {
		let pID = getThisPlayerID()
		let lvlSag = Global.findOne({id: pID}).newLvlStat.sag
		let pts = Global.findOne({id: pID}).pts
		if (pts > 0) {
			lvlSag += 1
			pts -= 1
		}
		Meteor.call('global.updateNewLevel', pID, "sag", lvlSag, pts)
	},


	'click .confirm' : function() {
		let pID = getThisPlayerID()
		if (Global.findOne({id: pID}).pts == 0) {
			applyLevelStats(pID)
			$('#modalLevelUp').modal('hide');
		} else {
			$('.lvlPoints').html("Brutto tossico hai ancora " + Global.findOne({id: pID}).pts + " punti da assengare!")
		}
	},
})

function applyLevelStats(pID) {
	let p = Players.findOne({id : pID})

	// Calculates the new Base Stats from Base + NewLevelStats
	let newStats = Meteor.myFunctions.fuseStats(p.stat, Global.findOne({id : pID}).newLvlStat)
	Meteor.call('player.updateStats', pID, newStats)

	// Once updated the base ones on the DB, recalculate the Total Stats and update them
	updateStats(pID)

	// Then update MaxHP, MaxMana, defences, etc...
	updateThisPlayerData()

	// Reset the pts and empty the spent points
	Meteor.call('global.emptyNewLevel', pID)
}

function getThisPlayerID(){
	if (Meteor.user().username != "admin") {
		return Players.findOne({username : Meteor.user().username}).id
	}
	return 1
}


// ---------------------------- DEBUGGING HELPERS ---------------------------- //

function resetPlayers() {
	for (var i = 1; i <= 5; i++) {
		let p = Players.findOne({id : i})
	    p.level = 1
	    p.stat = fillStats(1, 1, 1, 1, 1, 1, 1)
	    p.totalStat = getTotalStat(p)
	    p.defences = fillDefences(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	    p.maxHP = getMaxHP(p)
	    p.HP = p.maxHP
	    p.maxMana = getMaxMana(p)
	    p.mana = p.maxMana
	    p.maxXP = getXPForNextLevel(1)
	    p.XP = 0 
	    p.maxPT = getMaxPT(p)
	    p.PT = p.maxPT
	    p.maxPA = getMaxPA(p)
	    p.PA = p.maxPA 
	    p.equip = {
	    	head: "",
	    	neck: "",
	    	ringLeft: "",
	    	ringRight: "",
	    	weaponLeft: "",
	    	weaponRight: "",
	    	chest: "",
	    	gloves: "",
	    	legs: "",
	    	boots: ""
	    }
	    p.buffs = []
	    p.buffInstances = []
	    p.inventory = []

	    Meteor.call('player.updateFull', i, p)
	}
}

function fillStats(vit, forz, agi, int, vol, tem, sag) {
	let s = {
		vit: vit,
		for: forz,
		agi: agi,
		int: int,
		vol: vol,
		tem: tem,
		sag: sag,
	}
	return s
}

function fillDefences(a, df, de, rb, rc, ri, rs, tox, ev, pr) {
	let d = {
		armor : a, // TODO get armor from items and buffs
        DF : df,
        DE : de,
        RB : rb, 
        RC : rc, 
        RI : ri, 
        RS : rs, 
        TOX : tox, 
        evasion : ev, 
        precision : pr
	}
	return d
}


// ---------------------------- GET METHODS ---------------------------- //

function getTotalStat(p){
	// Calculate the total stats from Base + Race + Class
	let br = Meteor.myFunctions.fuseStats(p.stat, Meteor.myFunctions.getRaceStats(p, Races))
	let brc = Meteor.myFunctions.fuseStats(br, Meteor.myFunctions.getClassStats(p, Classes))

	// Add the Buff Stats TODO
	let buffStats = {
		"vit" : 0, 
        "for" : 0, 
        "agi" : 0, 
        "int" : 0, 
        "vol" : 0, 
        "tem" : 0, 
        "sag" : 0
	}
	let total = Meteor.myFunctions.fuseStats(brc, buffStats)
	return total 
}

function getMaxHP(p){
	let base = p.totalStat.vit * 20 + p.totalStat.for * 4 + p.totalStat.agi * 2
	let buffBonus = 0		// TODO

	return base + buffBonus
}

function getMaxMana(p){
	let base = p.totalStat.int * 20 + p.totalStat.sag * 5
	let buffBonus = 0		// TODO

	return base + buffBonus
}

function getMaxPA(p){
	let base = p.totalStat.agi * 10 + p.totalStat.int * 4
	let buffBonus = 0	// TODO

	return base + buffBonus
}

function getMaxPT(p){
	let base = p.totalStat.for * 15 + p.totalStat.tem * 5
	let buffBonus = 0	// TODO

	return base + buffBonus
}

function getDefences(p) {
	let defs = {
		armor : getArmor(p),
		DF : p.defences.DF,
		DE : p.defences.DE,
		RB : p.totalStat.vol * 1, 
        RC : p.totalStat.for * 4 + p.totalStat.vol * 1, 
        RI : p.totalStat.vol * 4, 
        RS : p.totalStat.vit * 4 + p.totalStat.vol * 1, 
        TOX : p.totalStat.vol * 1 + p.totalStat.tem * 4,
        precision : p.defences.precision,
        evasion : p.defences.evasion
	}

	return defs
}

function getArmor(p) {
	// Because armor gets update whenever an item is equipped and whenever a buff is 
	// casted, there is no need to calculate it. For now? 	TODO

	return p.armor
}

function getXPForNextLevel(level){
	if (level == 1) return 100
	let xp = (level * level)/(Math.sqrt(level * 50)) * 10
	xp = (Math.round(xp * xpPrecisionIndex) / xpPrecisionIndex).toFixed(2) * 100
	return xp
}

function getGainedXP(p, mob){
	let xpMultiplier = getXPMultiplier(p)
	let xp = 0
	let s = p.totalStat.sag

	if (s <= 20) {
		xp = mob.xp + (mob.xp * (0.02) * s) + (mob.xp * xpMultiplier)
	} else if(s <= 40) {
		xp = mob.xp + ((mob.xp * 0.01) * s)
	} else {
		xp = mob.xp
	}
	
	return xp
}

// TODO
function getXPMultiplier(p){
	
	// Scan the palyer's inventory for items that give +% xp bonus
	// Scan the palyer's active buffs for items that give +% xp bonus
	return 0
}

function getDamageReduction(p){
	const a = p.defences.armor
	let de = 0

	if (a != 1 && a > 0) {
		de = (a * 0.06) / (Math.sqrt(a) * 0.02)
	} else if (a < 0) {
		abs = Math.abs(a)
		de = (abs * 0.06) / (Math.sqrt(abs) * 0.02)
		de = -de
	} else {
		de = 0
	}

	de += getDamageReductionFromBuffs(p.buffs)
	
	return Math.round(de).toFixed(0)
}

function getDamageReductionFromBuffs(buffs){
	// TODO
	// Scan the active player buffs for Damage
	// Reduction modifiers
	return 0
}

function getRace(pID){

	return Players.findOne({id : pID}).race
}

function getClass(pID){

	return Players.findOne({id : pID}).class
}


