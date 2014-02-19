var Armor = new Equipment();

Armor.LIGHTARMORS = [
//    name,              GP, AC, DEX, Weight
    [ "padded armor",     5,  1,   8,  10 ],
    [ "leather armor",   10,  2,   6,  15 ],
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
    
    var equipmentSelected = this.selectEquipment(name, type)

    return Combat.Armor({
          name: equipmentSelected[0],
	  armorBonus: equipmentSelected[2],
	  isUnique: false
    });
};

var Shield = new Equipment();

Shield.SHIELDS = [
//    name,                  GP, AC, DEX, ACP, Weight
    [ "light wooden shield",  3,  1,    ,  -1,  5 ],
    [ "light metal shield",   9,  1,    ,  -1,  6 ],
    [ "heavy wooden shield",  7,  2,    ,  -2, 10 ],
    [ "heavy metal shield",  20,  2,    ,  -2, 15 ],
    [ "tower shield",        30,  4,   2, -10, 45 ],
];

Shield.NONE = [
    [ "no shield",            0,  0,    ,   0,  0 ],
]

Shield.makeShield = function(name, type) {
    type = typeof type !== 'undefined' ? type : Shield.SHIELDS;
    
    var equipmentSelected = this.selectEquipment(name, type)

    return Combat.Shield({
          name: equipmentSelected[0],
	  armorBonus: equipmentSelected[2],
	  isUnique: false
    });
};