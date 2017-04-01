// These functions are in the shared.js file because they need
// to be globaly accessible from both client and server.
// Calls should be handled with Metero.myFunctions.functionName([params])

Meteor.myFunctions = {
	getRaceStats : function(player, Races){
		const race = Races.findOne({ name : player.race })
		
		return race.stat
	},

	getClassStats : function(player, Classes){
		const clas = Classes.findOne({ name : player.class })
		
		return clas.stat
	},










	fuseDefences : function(a, b){
		let c = { 
			armor : a.armor + b.armor, 
			DF : a.DF + b.DF, 
			DE : a.DE + b.DE, 
			RB : a.RB + b.RB, 
			RC : a.RC + b.RC, 
			RS : a.RS + b.RS, 
			RI : a.RI + b.RI,
			TOX : a.TOX + b.TOX,
			evasion : a.evasion + b.evasion,
			precision : a.precision + b.precision,
		}
		return c
	},





	// Sums each stat of 2 stat objects and returns a fused stat object
	fuseStats : function(a, b){
		let c = { 
			vit : a.vit + b.vit, 
			for : a.for + b.for, 
			agi : a.agi + b.agi, 
			int : a.int + b.int, 
			vol : a.vol + b.vol, 
			tem : a.tem + b.tem, 
			sag : a.sag + b.sag
		}
		return c
	}
}