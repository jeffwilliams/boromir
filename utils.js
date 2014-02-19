var seed = Date.now();
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// this code adapted from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function GetURLParameter(parameter) {
    var pageURL      = window.location.search.substring(1);
    var URLVariables = pageURL.split('&');
    
    for (var i = 0; i < URLVariables.length; i++) {
	var parameterName = URLVariables[i].split('=');
	if (parameterName[0] === parameter) {
	    return parameterName[1];
	}
    }
}

function GetSeed() {
    var seedParameter = GetURLParameter("seed");
    
    // if seed is undefined (not set) return time.
    if ((typeof seedParameter) === "undefined") {
	return Date.now();
    } else {
	// if seed is set, strip any '-' and convert it to a number from hex.
	return parseInt(seedParameter.replace('-', ''), 16);
    }
}

function scrollToBottom() {
  var ODD_EXTRA_SPACE = 16;
  var windowHeight = window.innerHeight ||
                     document.documentElement.offsetHeight;
  var docHeight = document.body.clientHeight;
  if (windowHeight < docHeight) {
    var surplus = docHeight - windowHeight + ODD_EXTRA_SPACE;
    document.body.style.top = "-" +  surplus + "px";
  }
}

function Output(hero) {
  var queue = [];

  function showMessage(message) {
    var p = document.createElement("p");
    var baseClass = "combat " + message.category;
    
    if (message.attacker)
      baseClass += " " + message.attacker;
    p.setAttribute("class", baseClass);
    p.innerHTML = message.text;
    document.body.appendChild(p);
    setTimeout(function() {
      p.setAttribute("class", baseClass + " transition");
    }, 1);
    scrollToBottom();
  }
  
  function processNextCommand() {
    if (queue.length) {
      var command = queue.pop();
      if (command.type == "pause") {
        setTimeout(processNextCommand, command.seconds * 1000);
      } else {
        showMessage(command);
        processNextCommand();
      }
    }
  }

  var self = {
    playback: function() {
      processNextCommand();
    },
    emit: function(category, msg, info) {
      var attacker = null;
      if (info && info.attacker) {
        if (info.attacker === hero)
          attacker = "hero";
        else
          attacker = "villain";
      }
      queue.splice(0, 0, {
        type: "message",
        category: category,
        text: msg[0].toUpperCase() + msg.slice(1),
        attacker: attacker
      });
    },
    pause: function(seconds) {
      queue.splice(0, 0, {type: "pause", seconds: seconds});
    }
  };
  
  return self;
}