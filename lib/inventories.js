import { Players } 	from '../both/database.js';
import { Items } 	from '../both/database.js';
import { Consumables } from '../both/database.js';
import { Equips } 	from '../both/database.js';
import { Weapons } 	from '../both/database.js';

Inventory = class Inventory {
	constructor(player){
		this.player = player
		this.items = this.createInventoryObject(this.player)		
	}

	createInventoryObject(player){

		let arr = []
		if (player.inventory.length == 0) {
			return arr
		}
		for (let j = 0; j < player.inventory.length; j++) {
			let iid = player.inventory[j][0]
			let n = player.inventory[j][1]
			
			let i = Items.findOne({ id : iid})

			let o = {
				id : i.id,
				name : i.name,
				price : i.price,
				weight : i.weight,
				type : i.type,
				rarity : i.rarity,
				quantity : n,
				totalWeight : (i.weight * n),
				getItemIcon : this.getItemIcon(i.type)
			}

			if (o.type == "Consumabile") {
				let c = Consumables.findOne({ id : o.id });
				o.more = {
					fx : c.fx, 
				    fxDex : c.fxDex, 
				    PA : c.PA, 
				    duration : c.duration
				}
			} else if (o.type == "Equip") {

			} else if (o.type == "Weapons") {

			} else if (o.type == "Misc") {
				
			}

			arr.push(o)
		}

		return arr
	}

	getItemIcon(type){
		return "img/items/" + type + ".png"
	}
	

}