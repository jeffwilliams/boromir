var Weapons = new Equipment();

// Crit refers to crit range, distance from 20 you need to roll to crit. So
// a crit range of 20 is 0, 19-20 is 1, 18-20 is 3, ect.
// Mult refers to the multipler on a crit, x2, x3, ect..
//     name,          Die, Crit, Mult, damage,     type,     bonus
Weapons.NONE = [
    [ "unarmed",     "1d3",    0,    1, "bludgeon", "light",      0 ]
];

Weapons.LIGHTWEAPONS = [
    [ "dagger",      "1d4",    1,    2, "pierce",   "light",      0 ],
    [ "handaxe",     "1d6",    0,    3, "slash",    "light",      0 ],
    [ "shortsword",  "1d6",    1,    2, "pierce",   "light",      0 ],
];
  
Weapons.MEDIUMWEAPONS = [
    [ "heavy mace",  "1d8",    0,    2, "bludgeon", "one handed", 0 ],
    [ "warhammer",   "1d8",    0,    3, "bludgeon", "one handed", 0 ],
    [ "longsword",   "1d8",    1,    2, "slash",    "one handed", 0 ],
    [ "battleaxe",   "1d8",    0,    3, "slash" ],      
];
  
Weapons.HEAVYWEAPONS = [
    [ "greatsword",  "2d6",    1,    2, "slash",    "two handed", 0 ],
    [ "greataxe",   "1d12",    0,    3, "slash",    "two handed", 0 ],
];

Weapons.RANGED = [
    [ "longbow",     "1d8",    0,    3, "pierce",   "ranged",     0 ],
];

Weapons.MAGIC = [
    [ "Sting",       "1d6",    1,    2, "pierce",   "light",      2 ],
    [ "Andúril",     "1d8",   1,    2, "pierce",   "one handed", 3 ],
    [ "Glamdring",   "1d10",   1,    2, "pierce",   "two handed", 2 ],
    [ "Orcrist",     "1d8",    1,    2, "slash",    "one handed", 2 ],
    [ "Barrow Blade", "1d6",  1,    2, "pierce",   "light",       2 ]
];
  
Weapons.WEAPONS = Weapons.LIGHTWEAPONS.concat(Weapons.MEDIUMWEAPONS,
					      Weapons.HEAVYWEAPONS,
					      Weapons.RANGED,
					      Weapons.MAGIC)

Weapons.makeWeapon = function(name, type) {
    type = typeof type !== 'undefined' ? type : this.WEAPONS;

    var equipmentSelected = this.selectEquipment(name, type)
    
    return Combat.Weapon({
        name: equipmentSelected[0],
	damage: equipmentSelected[1],
	// if it has an attack bonus, it's unique!
	isUnique: (equipmentSelected[6] > 0),
	critRange: equipmentSelected[2],
	critMultiplier: equipmentSelected[3],
	bonus: equipmentSelected[6],
        type: equipmentSelected[5],
        words: WORDS[equipmentSelected[4]]
    });
};