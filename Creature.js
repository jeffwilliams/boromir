var Creature = function() {

    this.name    = "undefined";
    
    this.GENDERS = [ "male", "female", "neuter" ];
    this.gender  = "male";

    this.isUnique = false;

    this.level = 1;

    this.attributes = {
        str:  10,
        dex:  10,
        con:  10,
        type: "static",
	roll3d6: function roll3d6() {    
	    return Combat.utils.dieRoll("3d6");
	},
	roll4d6DropLowest: function roll4d6DropLowest() {
	    var rolls = new Array();

	    for (var rollNum = 1; rollNum <= 4; rollNum++) {
                rolls[rollNum] = Combat.utils.dieRoll("1d6");
            }
	    
	    // sort the array from high to low
            rolls.sort(function(a,b){return a-b}).reverse();
	    
	    // return the sum of the first 3.
	    return rolls[1] + rolls[2] + rolls[3];
	    
	},
        // rolls stats and lets them be assigned in desired order.
        rollOrdered: function rollOrdered(attributeOrder, rollFunction) {
	    this.type = rollFunction.name + " ordered";
	    
            // generate an array of stats.
            var attributes = new Array();
            for (var attributeNum = 1; attributeNum <= 6; attributeNum++) {
                attributes[attributeNum] = rollFunction();
            }
            
            // sort the array from high to low
            attributes.sort(function(a,b){return a-b}).reverse();
            
            this.str = attributes[attributeOrder.str];
            this.dex = attributes[attributeOrder.dex];
            this.con = attributes[attributeOrder.con];
        },
        // rolls stats in order
        rollInOrder: function rollInOrder(rollFunction) {
            this.type = rollFunction.name + " in order"
            
            this.str = Combat.utils.dieRoll(rollFunction);
            this.dex = Combat.utils.dieRoll(rollFunction);
            this.con = Combat.utils.dieRoll(rollFunction);
        }
    };

    this.hitDieType = "d8";

    this.rollHP = function() {
        var HP      = 0;
        // calculate con hp, it's static so we can just do it once.
        var conHP   = Combat.utils.abilityMod(this.attributes.con);

        // a log for storing HP rolls.
        this.HPlog = new Object();
        
        for (var level=1; level <= this.level; level++) {
            // roll class hp, add con HP.
            var rollHP  = Combat.utils.dieRoll(1 + this.hitDieType);
            var levelHP = rollHP + conHP
            
            // HP must always be at least 1.
            var addHP = (levelHP > 1) ? levelHP : 1;
            
            HP += addHP;
            
            // log the HP roll
            this.HPlog[level] = { level: level, hitdie: this.hitDieType, rollHP: rollHP, conHP: conHP, HP: HP};
        };

        return HP;
    };
    
    this.HUMANOIDPARTS = {
        light:  [ "fingers",   "hand",     "shoulder",  "arm",        "foot",  "leg" ],
        medium: [ "right arm", "left arm", "right leg", "left leg",   "side",  "flank" ],
        heavy:  [ "thigh",     "stomach",  "knee",      "midsection", "torso", "ribcage", "back" ],
        fatal:  [ "chest",     "head",     "neck",      "spine",      "skull", "eyes" ]
    }

    this.parts = this.HUMANOIDPARTS;

    this.make = function() {
        var creature = {
            name:     this.name,
            gender:   this.gender,
            isUnique: this.isUnique,
            level:    this.level,
            str:      this.attributes.str,
            dex:      this.attributes.dex,
            con:      this.attributes.con,
            hp:       this.rollHP(),
            parts:    this.parts,
            stumbles: WORDS.stumbles
        };
        
        return Combat.Creature(creature);
    }
}