# BotGuard
A minecraft bot to protect stuff, made with [mineflayer](https://github.com/PrismarineJS/mineflayer).
# Features
## PvP
Using a [pvp package](https://github.com/PrismarineJS/mineflayer-pvp) for [mineflayer](https://github.com/PrismarineJS/mineflayer), made by [PrismarineJS](https://github.com/PrismarineJS), the bot is able to combat a LOT of mobs/players at the same time (trust me, I tried /tp @e GuardBot and it killed all mobs). This feature is used in commands such as guard and fight me.

## Pathfinding
Using [mineflayer-pathfinder](https://github.com/PrismarineJS/mineflayer-pathfinder), made by [PrismarineJS](https://github.com/PrismarineJS), the bot is able to navigate around the world, with advanced A* pathfinding (video explaining A* can be found [here](https://www.youtube.com/watch?v=-L-WgKMFuhE)). This feature is used in almost every single command, including guard, fight me, follow and go to.

## Armor Managing
The bot is able to manage armor, aka put on armor, put shields in off-hand, etc. This is made partly using [this](https://github.com/PrismarineJS/MineflayerArmorManager) package and partly by me.

## Auto Eat
The bot is able to eat when it needs, using [this](https://github.com/link-discord/mineflayer-auto-eat) package.

## Web viewer
Using [this](https://github.com/PrismarineJS/prismarine-viewer) package, you are able to view the bots screen, in your browser. Pretty epic right?

# Commands
## Guard
The guard command allows the bot to guard a specific location in the world from mobs and players.

**Usage**
Simply type `guard` in the chat and it will guard the spot that you are standing on.

## Fight you
Using the same [package](https://github.com/PrismarineJS/mineflayer-pvp) as for the guard command, the bot is able to fight you.

**Usage**
This is just as easy as the guard command; type `fight me` in the chat, and the bot will run towards you and start to fight you.

## Stop
The stop command is a command that will stop all currently running processes of the bot (obviously). It will make the bot stop guarding, fighting or anything.

**Usage**
Type `stop` to make all processes stop.

## Go to
The command "go to" basically makes the bot go to specific coordinates in the world. It can both go to x, y and z, or just x and z.

**Usage**
`go to <x, y*, z>`

**y is optional*

## Follow
The follow command makes the bot follow a specified player.

**Usage**
`follow <player>`

## Misc
All commands that are not worth mentioning as much as the others.
The commands are:
Are you guarding?
*A command that allows the player to check if the bot is guarding, type* *`are you guarding?`* *in the chat, and the bot will either reply with "Nope" (if it's not guarding) or "Yes I am!" (if it is).*
Do you have a sword?
*Checks if thw bot has a sword in it's inventory, do* *`do you have a sword?`* *to make it reply with either "Yes, Sir" or "Sadly, No :(".*
Take the sword
*If you run this command, the bot will put a sword in it's hand, if it has one, else it will say "Bruh, I have no sword". You obviously do* *`take the sword`* *to make the bot take it.*

## Unfinished commands
The unfinished commands are: Protect and Godmode.
