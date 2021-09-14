const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')
const autoEat = require('mineflayer-auto-eat')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'BotGuard',
})

bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)
bot.loadPlugin(autoEat)

const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true })
})

bot.on('playerCollect', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const shield = bot.inventory.items().find(item => item.name.includes('shield'))
    if (shield) bot.equip(shield, 'off-hand')
  }, 250)
})

bot.on('login', () => {
  bot.chat("Hi! I'm BotGuard! I am here to protect you.")
})

bot.on('death', () => {
  bot.chat('F')
})

let guardPos = null

function goto (x, y, z) {
  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  movements.scafoldingBlocks = ['stone', 'cobblestone', 'dirt']
  bot.pathfinder.setMovements(movements)
  if (z) {
    bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z))
  } else {
    bot.pathfinder.setGoal(new goals.GoalXZ(x, y))
  }
}

function guardArea (pos) {
  guardPos = pos.clone()

  if (!bot.pvp.target) {
    moveToGuardPos()
  }
}

function stopGuarding () {
  guardPos = null
  bot.pvp.stop()
  bot.pathfinder.setGoal(null)
}

function moveToGuardPos () {
  goto(guardPos.x, guardPos.y, guardPos.z)
}

function godmode () {
  
}

bot.on('stoppedAttacking', () => {
  if (guardPos) {
    moveToGuardPos()
  }
})

bot.on('physicTick', () => {
  if (bot.pvp.target) return
  if (bot.pathfinder.isMoving()) return

  const entity = bot.nearestEntity()
  if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
})

bot.on('physicTick', () => {
  if (!guardPos) return

  const filter = e => (e.type === 'mob' || e.type === 'player') && e.position.distanceTo(bot.entity.position) < 10 && e.mobType !== 'Armor Stand' && e !== bot.players['IHasBone'].entity

  const entity = bot.nearestEntity(filter)
  if (entity) {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
    bot.pvp.attack(entity)
  }
})

function followPlayer(follow_player) {
  const player = bot.players[follow_player]

  if (!player || !player.entity) {
      bot.chat("I can't see " + follow_player + "!")
      return
  }

  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  movements.scafoldingBlocks = ['stone', 'cobblestone', 'dirt']

  bot.pathfinder.setMovements(movements)

  const goal = new goals.GoalFollow(player.entity, 1)
  bot.pathfinder.setGoal(goal, true)
}

function protect (player) {

}

bot.on('chat', (username, message) => {
  if (username === 'IHasBone') {
    if (message.toLowerCase() === 'guard') {
      const player = bot.players[username]

      if (!player) {
        bot.chat("I can't see you.")
        return
      }

      bot.chat('I will guard that location.')
      guardArea(player.entity.position)
    }

    if (message.toLowerCase() === 'fight me') {
      const player = bot.players[username]

      if (!player) {
        bot.chat("I can't see you.")
        return
      }

      bot.chat('Prepare to fight!')
      setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if (sword) bot.equip(sword, 'hand')
      }, 250)
      bot.pvp.attack(player.entity)
    }

    if (message.toLowerCase() === 'stop') {
      bot.chat('Stopped all current proccesses.')
      stopGuarding()
    }

    if (message.toLowerCase() === 'are you guarding?') {
      if (guardPos === null) {
        bot.chat('Nope')
      } else {
        bot.chat('Yes I am!')
      }
    }

    if (message.toLowerCase() === 'do you have a sword?') {
      const sword = bot.inventory.items().find(item => item.name.includes('sword'))
      if (sword) { bot.chat('Yes, Sir') } else bot.chat('Sadly, No :(')
    }

    if (message.toLowerCase() === 'take the sword') {
      setTimeout(() => {
        const sword = bot.inventory.items().find(item => item.name.includes('sword'))
        if (sword) {bot.equip(sword, 'hand')} else bot.chat("Bruh, I have no sword")
      }, 250)
    }

    if (message.toLowerCase().startsWith('go to ')) {
      const coords = message.split(' ')
      goto(coords[2], coords[3], coords[4])
    }

    if (message.toLowerCase().startsWith('follow ')) {
      const player = message.split(' ')[1]
      followPlayer(player)
    }

    if (message.toLowerCase().startsWith('protect ')) {
      const player = message.split(' ')[1]
      protect(player)
    }

    if (message.toLowerCase() === 'godmode') {
      godmode()
    }
  }
})

bot.on('kicked', console.log)
bot.on('error', console.log)