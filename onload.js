onresize = scrollToBottom;

// Prevent touch-based scrolling.
ontouchstart = function(event) { event.preventDefault(); };

var versionNumber = .42;
var versionText = "Magic weapons!";

onload = function() {
  document.getElementById("Version").innerHTML=versionNumber + ' - ' + versionText;
  
  var simulateButton = document.getElementById("simulate");
  simulateButton.onclick = doSimulation;
  
    var heroParameter = GetURLParameter("hero");
    
    // if hero parameter is set is set, set the value to it and do simulation.
    if ((typeof heroParameter) !== "undefined") {
	document.getElementById("hero").value = heroParameter;
	simulateButton.click();
    }
};
 
var doSimulation = function doSimulation(event) {    
    event.preventDefault();

    seed = GetSeed();
  
    var seedString = seed.toString(16).toUpperCase();
    var seedName = seedString.slice(0, 5) + '-' + seedString.slice(5);
    
    var heroValue = document.getElementById("hero").value;
    
    // remove elment now.
    document.getElementById("heroform").remove();
    
    var heroName, heroAttributeOrder, heroAttributeBonus, heroWeapon, heroArmor;
    
    switch (heroValue) {
	case "Gimli":
	default:
	    heroName           = "Gimli";
	    heroAttributeOrder = {str: 1, dex: 4, con: 2};
	    heroAttributeBonus = {str: 0, dex: 0, con: 2};
	    heroWeapon         = Weapons.makeWeapon("greataxe");
	    heroArmor          = Armor.makeArmor("chainmail");
	    break;
	case "Legolas":
	    heroName           = "Legolas";
	    heroAttributeOrder = {str: 5, dex: 1, con: 4};
	    heroAttributeBonus = {str: 0, dex: 2, con: 0};
	    heroWeapon         = Weapons.makeWeapon("longbow");
	    heroArmor          = Armor.makeArmor("leather armor");
	    break;
	case "Boromir":
    	    heroName           = "Boromir";
	    heroAttributeOrder = {str: 1, dex: 2, con: 3};
	    heroAttributeBonus = {str: 0, dex: 0, con: 0};
	    heroWeapon         = Weapons.makeWeapon("longsword");
	    heroArmor          = Armor.makeArmor("chainmail");
	    break;
	case "Aragorn":
    	    heroName           = "Aragorn";
	    heroAttributeOrder = {str: 1, dex: 2, con: 3};
	    heroAttributeBonus = {str: 0, dex: 0, con: 0};
	    heroWeapon         = Weapons.makeWeapon("Andúril");
	    heroArmor          = Armor.makeArmor("chainmail");
	    break;
    }
    
  var Hero = new Creature();
  
  Hero.name     = heroName;
  Hero.isUnique = true;
  Hero.level    = 15;
  
  Hero.attributes.rollOrdered(heroAttributeOrder, Hero.attributes.roll4d6DropLowest);
  
    Hero.attributes.str += heroAttributeBonus.str; // racial bonus.
    Hero.attributes.dex += heroAttributeBonus.dex; // racial bonus.
    Hero.attributes.con += heroAttributeBonus.con; // racial bonus.
  
  console.log(Hero);
  Hero.hitDieType = "d10";
  
  var hero = Hero.make();

  hero.equipWeapon(heroWeapon);
  hero.equipArmor(heroArmor);

  var Orc = new Creature();
  
  Orc.name  = "orc";
  Orc.level = Combat.utils.dieRoll("2d4");
  
  Orc.makeOrc = function() {
    Orc.attributes.rollOrdered({str: 1, dex: 3, con: 2}, Orc.attributes.roll3d6);
    Orc.attributes.str += 4;

    console.log(Orc);
    orc = this.make();
    
    orc.equipWeapon(Weapons.makeWeapon("random", Weapons.MEDIUMWEAPONS));
    orc.equipArmor(Armor.makeArmor("random", Armor.LIGHTARMORS));
    
    return orc;
  }
  
  var output = Output(hero);
  var view = Grammar.View();
  var narrator = Combat.Narrator(view, output);
  var attack = Combat.MeleeAttack(narrator);
  
  output.emit("start", hero.name + ": " + seedName + " slaps his " + 
	      hero.weapon.name + " against his " + hero.armor.name +
	      " eagerly!");
  output.pause(1);

  function combat(p1, p2) {
    var m = [[p1, p2], [p2, p1]];
    if (p2.check('dex') >= p1.check('dex'))
      m.reverse();
    
    output.emit("begin", p1.definiteName + " and " + p2.definiteName +
                " close in and begin to fight!");
    output.pause(1);

    function statusStr(creature) {
      return creature.name + ": " + creature.hp + "/" + creature.maxHp() +
             " HP AC " + creature.armorClass();
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
        output.pause(1);
      }
    }
  }

  for (var count = 0; hero.hp > 0; count++) {
    var villian = Orc.makeOrc();
    output.emit("intro", villian.indefiniteName + " wielding " +
                villian.weapon.indefiniteName + " and wearing " + 
                villian.armor.name + " approaches!");
    combat(villian, hero);
    output.pause(3);
  }

    var linkUrl = "http://boromir.maxmahem.net/?hero=" + hero.name + "&seed=" +
	          seedName;
    output.emit("conclusion", "After killing " + (count-1) + " " +
                 villian.name + "s, " + hero.name + ": " + seedName + " died.");
    output.emit("link", "Share this <a href='" + linkUrl + "'>" + hero.name + 
                "'s URL</a>, or roll a <a href='http://boromir.maxmahem.net/'>new one!</a>");

  output.playback();
};
