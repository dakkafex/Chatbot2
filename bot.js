// Very primitve chatbot written by Bas Korthals
// version 0.0.idk

// NPM module, install by using: npm install readline-sync
const rl = require("readline-sync");
// Npm module for morsecode encoding and decoding.
// install by using: npm install morse-node
const morse = require('morse-node').create("ITU");

var cdata = {
  current: "entry"
}; // Conversation data


var states = {
  // Sets the username and advances to the commands list
  entry: cdata => {
    console.log("Hey! What's your name?");
    var reply = rl.prompt();// sets user input to reply
    var rmatch = reply.match(/(\w+)\.?$/i);
    if (rmatch !== null) {
      reply = rmatch[1];
    }
    cdata.name = reply;
    console.log("Alright, I'll call you " + reply + ".");
    return "parsecommand";
  },
  // Takes the users input and checks it against the state objects.
  parsecommand: cdata => {
    console.log("\nWhat do you want me to do?");
    var reply = rl.prompt();
    var replycmd = Object.keys(states.commands).find(el => reply.indexOf(el) !== -1);
    if (replycmd) return ["commands", replycmd];
    return "notunderstand"
  },
  // All the commands for the bot
  commands: {

    odd: cdata => {
      console.log("Okidoki, to what range: ");
      var reply = rl.prompt();
      var x = (Math.floor(Math.random() * reply));
      x += (x % 2 == 0 ? 1 : 0);
      console.log(x);
      return "parsecommand";
    },

    prime: cdata => {
      console.log("Tell me the range of the prime's");
      var reply = rl.prompt();

      var getPrime = (n) => {
        var arr = [];
        var count = 0;

        for (var j = 1; j <= n; j++) {
          for (var i = 1; i <= j; i++) {
            if (j % i == 0) {
              count++;
            }
          }
          if (j == 1) {
            arr.push(j);
          }
          if (count == 2) {
            arr.push(j);
          }
          count = 0;
        }
        return arr;
      }
      console.log(getPrime(reply));
      return "parsecommand";
    },

    palindrome: cdata => {
      console.log("Ok, give me a word.");
      var reply = rl.prompt();
      var reverseString = (str) => {
        return str.split("").reverse().join("");
      }
      if (reverseString(reply.toLowerCase()) == reply)
        console.log(reply + " is a palindrome.");
      else
        console.log(reply + " isn't a palindrome.");
      return "parsecommand";
    },

    better: cdata => {
      console.log("Sure, give me the first thing to compare");
      var cases = [rl.prompt()];
      console.log("And now the second case");
      cases.push(rl.prompt());
      console.log(cases[Math.floor(Math.random() * 2)] + " is defenitly better " + cdata.name + " I mean... c'mon");
      return "parsecommand";
    },

    morse: cdata => {
      console.log("Morse code... what is this, 1912? Allright what do you want to convert");
      var reply = rl.prompt();
      console.log(morse.encode(reply));
      return "parsecommand";
    },

    guess: cdata => {
      console.log("Ok... then im just gonna be the great lambda and read your mind.\nAnswer me with higher, lower or right");
      var lL = 0;
      var uL = 100000
      var guessNumber = () => {
        while (true) {

          var guessNumber = Math.floor(Math.random() * (uL - lL)) + lL;;
          console.log("is your number " + guessNumber);
          var reply = rl.prompt();
          if (reply == "higher")
          { lL = guessNumber; }
          else if (reply == "lower")
          { uL = guessNumber; }
          else if (reply == "right")
          { return false; }
          else
          { console.log("Eh... what?"); }
        }

      }
      guessNumber();


      return "parsecommand";
    }
  },
  // User said whaaaaat?
  notunderstand: cdata => {
    console.log("I'm sorry " + cdata.name + ", I can't let you do that.");
    return "parsecommand";
  }
}

// This method allows to nest state objects pretty deep.
var resolve = (states, arg) => {
  if (typeof arg === "string")
    return states[arg];
  return arg.reduce((acc, el) => acc[el], states);
}

// Main state machine loop.
while (true) {
  cdata.current = resolve(states, cdata.current)(cdata);
}