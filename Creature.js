var Creature = function() {

    this.name    = "undefined";
    this.GENDERS = [ "male", "female", "neuter" ];
    this.gender  = "male";

    this.isUnique = false;

    this.level = 1;

    this.attributes = {
        str: 10,
        dex: 10,
        con: 10
    };

    this.hitDieType = "d8";

    this.HUMANOIDPARTS = {
        light:  [ "fingers",   "hand",     "shoulder",  "arm",        "foot",  "leg" ],
        medium: [ "right arm", "left arm", "right leg", "left leg",   "side",  "flank" ],
        heavy:  [ "thigh",     "stomach",  "knee",      "midsection", "torso", "ribcage", "back" ],
        fatal:  [ "chest",     "head",     "neck",      "spine",      "skull", "eyes" ]
    }

    this.parts = this.HUMANOIDPARTS;

    this.rollHP = function() {
        // concat level onto hitdie to make an appropriate die roll ie (1d8)
        var classHP = Combat.utils.dieRoll(this.level + this.hitDieType);

        // calculate con hp
        var conHP   = Combat.utils.abilityMod(this.attributes.con) * this.level;

        // return the combination as hp.
        return classHP + conHP
    };

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