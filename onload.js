onresize = scrollToBottom;

// Prevent touch-based scrolling.
ontouchstart = function(event) { event.preventDefault(); };

onload = function() {
  var boromir = Combat.Creature({
    name: "Gimli",
    gender: "male",
    isUnique: true,
    level: 15,
    str: 17,
    dex: 10,
    con: 17,
    hp: 128, // 15d10 + 83 Con
    parts: WORDS.humanoidParts,
    stumbles: WORDS.stumbles
  });

  boromir.equipWeapon(Weapons.makeWeapon("greataxe"));
  boromir.equipArmor(Armor.makeArmor("chainmail"));
//  boromir.equipArmor(Boromir.utils.makeArmor("chainmail"));

  function makeOrc() {
    var orc = Combat.Creature({
      name: "orc",
      gender: "male",
      isUnique: false,
      level: 4,
      str: 15,
      dex: 12,
      con: 13,
      hp: 30,
      parts: WORDS.humanoidParts,
      stumbles: WORDS.stumbles
    });

    orc.equipWeapon(Weapons.makeWeapon("random", Weapons.MEDIUMWEAONS));
    orc.equipArmor(Boromir.utils.makeArmor("random"));
    return orc;
  }
  
  var output = Output(boromir);
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

  for (var count = 0; boromir.hp > 0; count++) {
    var orc = makeOrc();
    output.emit("intro", orc.indefiniteName + " wielding " +
                orc.weapon.indefiniteName + " approaches!");
    combat(orc, boromir);
    output.pause(3);
  }

  output.emit("conclusion", "After killing " + (count-1) + " " +
              orc.name + "s, " + boromir.name + " died.");

  output.playback();
};