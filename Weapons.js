var Weapons = new Equipment();

// Crit refers to crit range, distance from 20 you need to roll to crit. So
// a crit range of 20 is 0, 19-20 is 1, 18-20 is 3, ect.
// Mult refers to the multipler on a crit, x2, x3, ect..
//         name,          Die, Crit, Mult, damage,    type
Weapons.LIGHTWEAPONS = [
	[ "dagger",     "1d4",    1,    2, "pierce", "light" ],
	[ "handaxe",    "1d6",    0,    3, "slash",  "light" ],
	[ "shortsword", "1d6",    1,    2, "pierce", "light" ],
];
  
Weapons.MEDIUMWEAPONS = [
	[ "heavy mace", "1d8",    0,    2, "bludgeon", "1hand" ],
	[ "warhammer",  "1d8",    0,    3, "bludgeon", "1hand" ],
	[ "longsword",  "1d8",    1,    2, "slash",    "1hand" ],
	[ "battleaxe",  "1d8",    0,    3, "slash" ],      
];
  
Weapons.HEAVYWEAPONS = [
        [ "greatsword", "2d6",    1,    2, "slash",    "1hand" ],
        [ "greataxe",  "1d12",    0,    3, "slash",    "1hand" ],
];
  
Weapons.WEAPONS = Weapons.LIGHTWEAPONS.concat(Weapons.MEDIUMWEAPONS, Weapons.HEAVYWEAPONS)

Weapons.makeWeapon = function(name, type) {
    type = typeof type !== 'undefined' ? type : this.WEAPONS;

    var equipmentSelected = this.selectEquipment(name, type)
    
    return Combat.Weapon({
        name: equipmentSelected[0],
	damage: equipmentSelected[1],
	isUnique: false,
	critRange: equipmentSelected[2],
	critMultiplier: equipmentSelected[3],
        words: WORDS[equipmentSelected[4]]
    });
};