# Chatbot

This is a very primitive "chatbot" written as a test of my skills

# Howto

Currently this bot lives in the console.
To use it you must install NodeJS 6.9.5(or higher as long as the modules used dont become depricated)
After that, start up Nodejs and a terminal should pop up, alteratively you can open a blank terminal and use "node" in front of any commands.

Chatbot requires 2 extra NPM modules to be installed, **readline-sync** and **morse-code** you can install them by enterting: 
**(node) npm install readline-sync (and "morse-code" after that)**
Some warnings might pop up but you can ignore them

After you installed the modules, in the same terminal window just enter: (node) bot.js , make sure you are pointing to the right path, and you are ready to ask it questions.

# Usage 
The bot is made to recognize keywords in any sentance.
current keywords are:
- prime,      example: "yoooooo botman, i want to do something with prime numbers!"
- odd,        example: "give me a random odd number"
- palindrome, example: "I'm trying to figure out what a palindrome is"
- better,     example: "I have a dillema, what is better?"
- morse,      example: "quick, the ship is sinking! i need to translate this help message to morse!!"

Currently the bot only understands english, the next version might cointain localization suport with the help of Json files.
