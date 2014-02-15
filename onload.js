onresize = scrollToBottom;

// Prevent touch-based scrolling.
ontouchstart = function(event) { event.preventDefault(); };

onload = function() {
  var str    = 17;
  var con    = 17;
  var level  = 15;
  var hitdie = "d10";
  
  var classhp = Combat.utils.dieRoll(level+hitdie);
  var conhp   = Combat.utils.abilityMod(con) * level;
  var hp      = classhp + conhp;
    
  var hero = Combat.Creature({
    name: "Gimli",
    gender: "male",
    isUnique: true,
    level: level,
    str: str,
    dex: 10,
    con: con,
    hp: hp,
//    hp: 128, // 15d10 + 83 Con
    parts: WORDS.humanoidParts,
    stumbles: WORDS.stumbles
  });

  hero.equipWeapon(Weapons.makeWeapon("greataxe"));
  hero.equipArmor(Armor.makeArmor("chainmail"));

  var str    = 15;
  var con    = 13;
  var level  = 4;
  var hitdie = "d8";
  
  var classhp = Combat.utils.dieRoll(level+hitdie);
  var conhp   = Combat.utils.abilityMod(con) * level;
  var hp      = classhp + conhp;
  
  function makeOrc() {
    var orc = Combat.Creature({
      name: "orc",
      gender: "male",
      isUnique: false,
      level: level,
      str: str,
      dex: 12,
      con: con,
      hp: hp,
      parts: WORDS.humanoidParts,
      stumbles: WORDS.stumbles
    });

    orc.equipWeapon(Weapons.makeWeapon("random", Weapons.MEDIUMWEAPONS));
    orc.equipArmor(Armor.makeArmor("random", Armor.LIGHTARMORS));
    return orc;
  }
  
  var output = Output(hero);
  var view = Grammar.View();
  var narrator = Combat.Narrator(view, output);
  var attack = Combat.MeleeAttack(narrator);

  function combat(p1, p2) {
    var m = [[p1, p2], [p2, p1]];
    if (p2.check('dex') >= p1.check('dex'))
      m.reverse();
    
    output.emit("begin", p1.definiteName + " and " + p2.definiteName +
                " close in and begin to fight!");
    output.pause(2);

    function statusStr(creature) {
      return creature.name + ": " + creature.hp + "/" + creature.maxHp() +
             " HP";
    }

    while (1) {
      output.emit("status", statusStr(p2) + "  " + statusStr(p1));
      for (var i = 0; i < m.length; i++) {
        var attacker = m[i][0];
        var defender = m[i][1];
        if (attacker.hp)
          attack.executeTurn(attacker, defender);
        if (defender.hp == 0) {
          output.emit("death", defender.definiteName + " has been killed!");
          return;
        }
        output.pause(3);
      }
    }
  }

  for (var count = 0; hero.hp > 0; count++) {
    var orc = makeOrc();
    output.emit("intro", orc.indefiniteName + " wielding " +
                orc.weapon.indefiniteName + " approaches!");
    combat(orc, hero);
    output.pause(3);
  }

  output.emit("conclusion", "After killing " + (count-1) + " " +
              orc.name + "s, " + hero.name + " died.");

  output.playback();
};