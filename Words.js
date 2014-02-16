var WORDS = {
    pierce: {
      light:  [ "scrape[s]",    "poke[s]",     "graze[s]",  "minorly wound[s]" ],
      medium: [ "cut[s] into",  "wound[s]",    "maul[s]",   "stab[s]" ],
      heavy:  [ "tear[s] into", "rip[s] into", "drive[s] %(his)s %(weapon)s into",
		"thrust[s] %(his)s %(weapon)s into" ]
    },
    slash: {
      light:  [ "scrape[s]",    "scratch[es]", "graze[s]", ],
      medium: [ "cut[s] into",  "wound[s]",    "slash[es]", "slice[s]", ],
      heavy:  [ "tear[s] %(his)s %(weapon)s into", 
		"slice[s] %(his)s %(weapon)s across",
		"chop[s] %(his)s %(weapon)s deep into",
		"drive[s] %(his)s %(weapon)s deep into", ],
    },
    bludgeon: {
      light:  [ "strike[s]", "glance[s]", "slap[s]" ],
      medium: [ "pound[s]", "beat[s]", "batter[s]", "hammer[s]", "slug[s]" ],
      heavy:  [ "hurl[s] %(his)s %(weapon)s into", "hammer[s] %(his)s %(weapon)s into", "drive[s] %(his)s %(weapon)s into" ]
    },
    stumbles: [
      [ "%(o_name)s tr<ies|y> to anticipate %(name_pos)s attack, but miscalculate<s>...",
	"%(o_name)s <is|are> caught off-guard for a moment...!",
	"%(o_name)s tr<ies|y> to dodge %(name_pos)s attack, but stumble<s>...",
	"Weary from battle, %(o_name)s stagger<s> for a moment...",
	"%(name)s trip[s] %(o_name)s and %(o_he)s fall<s> to the ground!",
	"%(name)s launch[es] %(himself)s at %(o_name)s!" ],
      [ "%(o_name)s make<s> a feeble attempt to block %(name_pos)s next attack...", 
	"%(o_name)s moan<s>...", 
	"%(o_name)s reel<s> from the shock...", 
	"%(o_name)s stagger<s>...", 
	"%(o_name)s fall<s> to %(o_his)s knees!", 
	"%(name)s trip[s] %(o_name)s and %(o_he)s fall<s> to the ground!" ]
    ]
};