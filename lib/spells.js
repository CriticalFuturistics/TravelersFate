import { Spells } 	from '../both/database.js';

Spellbook = class Spellbook {
	constructor(player){
		this.playerID = player.id
		this.spells = this.createSpellsObject(player)		
	}

	createSpellsObject(player){

		let arr = []
		if (player.spells.length == 0) {
			return arr
		}
		for (let j = 0; j < player.spells.length; j++) {
			let spellID = player.spells[j].spellID
			let s = Spells.findOne({ id : spellID})

			let o = {
				id 		: s.id,
				name 	: s.name,
				dex 	: s.dex,
				requiredAbility : s.requiredAbility,
				requiredClass : s.requiredClass,
				mana 	: s.mana,
				pa 		: s.pa,
				isEvocation 	: s.isEvocation,
				isIncantation 	: s.isIncantation,
				isBuff : s.isBuff,
				fx 		: s.fx,
				getSpellIcon 	: this.getSpellIcon(s.id)
			}
			arr.push(o)
		}
		return arr
	}

	getSpellIcon(id){
		return "img/spells/" + id + ".png"
	}
	

}