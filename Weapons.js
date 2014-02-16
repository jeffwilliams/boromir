var Weapons = Equipment;

// Crit refers to crit range, distance from 20 you need to roll to crit. So
// a crit range of 20 is 0, 19-20 is 1, 18-20 is 3, ect.
// Mult refers to the multipler on a crit, x2, x3, ect..
//     name,             GP,    Die, Crit, Mult, lbs, damage type
Weapons.LIGHTWEAPONS = [
	[ "dagger",           2,  "1d4",    1,    2,   1, "pierce" ],
	[ "handaxe",          6,  "1d6",    0,    3,   3, "slash" ],
	[ "shortsword",      10,  "1d6",    1,    2,   2, "pierce" ],
];
  
Weapons.MEDIUMWEAPONS = [
	[ "heavy mace",      12,  "1d8",    0,    2,   8, "bludgeon" ],
	[ "warhammer",       12,  "1d8",    0,    3,   5, "bludgeon" ],
	[ "longsword",       15,  "1d8",    1,    2,   4, "slash" ],
	[ "battleaxe",       10,  "1d8",    0,    3,   7, "slash" ],      
];
  
Weapons.HEAVYWEAPONS = [
        [ "greatsword",      50,  "2d6",    1,    2,  15, "slash" ],
        [ "greataxe",        20, "1d12",    0,    3,  12, "slash" ],
];
  
Weapons.WEAPONS = Weapons.LIGHTWEAPONS.concat(Weapons.MEDIUMWEAPONS, Weapons.HEAVYWEAPONS)

Weapons.makeWeapon = function(name, type) {
    type = typeof type !== 'undefined' ? type : this.WEAPONS;

    var equipmentSelected = this.selectEquipment(name, type)
    
    return Combat.Weapon({
        name: equipmentSelected[0],
	damage: equipmentSelected[2],
	isUnique: false,
	critRange: equipmentSelected[3],
	critMultiplier: equipmentSelected[4],
        words: WORDS[equipmentSelected[6]]
    });
};