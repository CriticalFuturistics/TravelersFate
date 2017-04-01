import { Buffs } 	from '../both/database.js';
import { Players} 	from '../both/database.js'

Buff = class Buff {
	constructor(buffID, caster, target){
		let buffObject = Buffs.findOne({id : buffID});
		this.buffID = buffID
		this.caster = caster
		this.target = target

		this.turns = buffObject.duration
		this.turnsLeft = this.turns
		this.isPermanent = buffObject.isPermanent
	}

	getBuffID(){
		return this.buffID
	}

	getCaster(){
		return this.caster
	}

	getTarget(){
		return this.target
	}

	getTotalTurns(){
		return this.turns
	}

	getTurnsLeft(){
		return this.turnsLeft
	}

	// Advances the buff instance to the next turn. Returns true if there are turns left, false if 
	// there are not. TODO when false is returned, be sure to delete the instance (from outside the class methods)
	nextTurn(){
		if (this.turnsLeft > 1) {
			this.turnsLeft -= 1
		} else if (this.turnsLeft == 0) {
			return false
		}
		return true
	}

}


Buff.nextTurn = function(turnsLeft){
	if (turnsLeft > 1) {
		turnsLeft -= 1
		
	} else if (turnsLeft == 0) {
		return false
	}
	return true
}

Buff.getTurnsLeft = function(buffID, playerID){
	let p = Players.findOne({id : playerID})
	if ($.inArray(buffID, p.buffs) != -1) {
		return p.buffInstances[p.buffs.indexOf(buffID)].turnsLeft
	}
	return -1
}