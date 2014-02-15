var Armor = function() {
  var LIGHTARMORS = [
//    name,              GP, AC, DEX, Weight
    [ "cloth",            0,  0,   8,  1 ],
    [ "padded",           5,  1,   8,  10 ],
    [ "leather",         10,  2,   6,  15 ],
    [ "chain shirt",    100,  4,   4,  25 ],
  ];
  
  var MEDIUMARMORS = [
    [ "hide",            15,  3,   4,  25 ],
    [ "chainmail",      150,  5,   2,  40 ],      
  ];
  
  var HEAVYARMORS = [
    [ "splint mail",    200,  6,   0,  45 ],
    [ "half plate",     600,  7,   0,  50 ],
    [ "full plate",    1500,  8,   1,  50 ],
  ];
  
  var ARMORS = LIGHTARMORS.concat(MEDIUMARMORS, HEAVYARMORS);

  var makeArmor = function(name, type) {
      type = typeof type !== 'undefined' ? type : ARMORS;
      
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
    
    return {
	LIGHTARMORS:  LIGHTARMORS,
	MEDIUMARMORS: MEDIUMARMORS,
	HEAVYARMORS:  HEAVYARMORS,
	ARMORS:       ARMORS,
	makeArmor:    makeArmor,
    };
}(Combat);