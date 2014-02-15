var Armor = new Object;

Armor.LIGHTARMORS = [
//    name,              GP, AC, DEX, Weight
    [ "cloth",            0,  0,   8,  1 ],
    [ "padded",           5,  1,   8,  10 ],
    [ "leather",         10,  2,   6,  15 ],
    [ "chain shirt",    100,  4,   4,  25 ],
];
  
Armor.MEDIUMARMORS = [
    [ "hide",            15,  3,   4,  25 ],
    [ "chainmail",      150,  5,   2,  40 ],      
];
  
Armor.HEAVYARMORS = [
    [ "splint mail",    200,  6,   0,  45 ],
    [ "half plate",     600,  7,   0,  50 ],
    [ "full plate",    1500,  8,   1,  50 ],
];
  
Armor.ARMORS = Armor.LIGHTARMORS.concat(Armor.MEDIUMARMORS, Armor.HEAVYARMORS);

Armor.makeArmor = function(name, type) {
    type = typeof type !== 'undefined' ? type : Armor.ARMORS;

    function makeEquippable(name, array, factory) {
	if (name == "random")
	    return factory(Combat.utils.randomChoice(array));

	for (var i = 0; i < array.length; i++)
	    if (array[i][0] == name)
		return factory(array[i]);

	throw new Error("unknown equippable: " + name);
    }

    return makeEquippable(name, type, function(info) {
	return Combat.Armor({
          name: info[0],
	  armorBonus: info[2],
	  isUnique: false
	});
    });
};