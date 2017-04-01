import { Players } from '../both/database.js'
import { Global } from '../both/database.js'

// These functions are in the sharedMethods.js file because they need
// to be accessible from both client and server to update data on the DB.
// Calls should be handled with Metero.call('methodName', [params])

Meteor.methods({
  'player.updateMaxHP' : function(pID, h) {

	Players.update(
		{ id : pID }, 
		{ $set : { maxHP : h } }, 
		{ multi : true }
	)

	return "maxHP has been updated to " + h
  },

  'player.updateMaxMana' : function(pID, m) {

	Players.update(
		{ id : pID }, 
		{ $set : { maxMana : m } }, 
		{ multi : true }
	)
	return "maxMana has been updated to " + m + "."
  },

  'player.updateMaxXP' : function(pID, xp){
  	Players.update(
		{ id : pID }, 
		{ $set : { maxXP : xp } }, 
		{ multi : true }
	)
  },

  'player.updateStats' : function(pID, stats){
  	Players.update(
		{ id : pID }, 
		{ $set : { stat : stats } }, 
		{ multi : true }
	)
	return "Stats have been updated."
  },

  'player.updateTotalStats' : function(pID, stats){
  	Players.update(
		{ id : pID }, 
		{ $set : { totalStat : stats } }, 
		{ multi : true }
	)

	return "Total Stats have been updated."
  },


  'global.update' : function(global){
  	Global.update({ _id : global._id}, 
		{ $set : { 
			turn : global.turn,
			isDaytime : global.isDaytime,
			dimension : global.dimension,
			continent : global.continent,
			isGameStart : global.isGameStart,
			} 
		}, 
		{ multi : true }
	)
  },

  'player.updateFull' : function(pID, p){

  	Players.update(
		{ id : pID }, 
		{ $set : { 
			sign : 		p.sign, 
		    level : 	p.level, 
		    stat : 		p.stat,
		    totalStat : p.totalStat, 
		    defences : 	p.defences, 
		    maxHP : 	p.maxHP, 
		    HP : 		p.HP, 
		    maxMana : 	p.maxMana, 
		    mana : 		p.mana, 
		    maxXP : 	p.maxXP, 
		    XP : 		p.XP, 
		    maxPT : 	p.maxPT, 
		    PT : 		p.PT,  
		    maxPA : 	p.maxPA, 
		    PA : 		p.PA,
		    equip : 	p.equip, 
		    buffs : 		p.buffs, 
		    buffInstances : p.buffInstances,
		    inventory : 	p.inventory, 
		    spells : 		p.spells,
		    skills : 		p.skills,
		    abilities : 	p.abilities, 
		    canLevelUp : 	p.canLevelUp
			} 
		}, 
		{ multi : true }
	)

  },

  'player.updateXP' : function(pID, xp, maxXP, level) {
  	Players.update(
		{ id : pID }, 
		{ $set : { XP : xp, maxXP : maxXP, level : level} }
	)
  },


  'global.updateNewLevel' : function(pID, type, n, pts){
  	if (type == "vit") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.vit" : n, pts : pts } }
		)
  	} else if (type == "for") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.for" : n, pts : pts } }
		)
  	} else if (type == "agi") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.agi" : n, pts : pts } }
		)
  	} else if (type == "int") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.int" : n, pts : pts } }
		)
  	} else if (type == "vol") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.vol" : n, pts : pts } }
		)
  	} else if (type == "tem") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.tem" : n, pts : pts } }
		)
  	} else if (type == "sag") {
  		Global.update(
			{ id : pID }, 
			{ $set : { "newLvlStat.sag" : n, pts : pts } }
		)
  	}
  },

  'global.emptyNewLevel' : function(pID) {
  	let emptyStat = { 
  		vit : 0,
  		for : 0,
  		agi : 0,
  		int : 0,
  		tem : 0,
  		vol : 0,
  		sag : 0,
  	}

  	Global.update(
		{ id : pID }, 
		{ $set : { pts : Global.findOne({id : -1}).ptsPerLvl, newLvlStat : emptyStat }
		}
	)
  },
  	




  // Not using this, since we are updating the local player object on the client.
  'player.removeBuffs' : function(pID, buffID){
  	let buffInstance = Players.findOne({id:pID}).buffInstances[Players.findOne({id:pID}).buffs.indexOf(buffID)]
  	let a = Players.findOne({id:pID}).buffs
  	let b = Players.findOne({id:pID}).buffInstances

  	if (a.length > 0 && b.length > 0) {
		a.splice(a.indexOf(buffID), 1)
		b.splice(b.indexOf(buffID), 1)
	}
	if (a.length === 0 || a == null) {
		a = []
		b = []
	}

	Players.update(
  		{ id : pID }, 
		{ $set : { 
			buffs : a,
			buffInstances : b
			}
		},
		{ multi : true}
	)
  }

})