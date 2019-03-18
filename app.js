const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Woof!');
  client.user.setActivity("with an ultimate boomerang", { type: "PLAYING" })
});

client.on("message", message => {
  const msg = message.content.toLowerCase();
  const swearingEnabled = require('./commands/noswearing.js');
  const grammarCheck = require('./commands/data/grammarcheck.js');

  if (!swearingEnabled && !message.author.bot) {
    const swearWords = require('./commands/data/swearwords.js');
    const removeDupChar = s => s.split("").reduce((a, b) => (a[a.length - 1] != b) ? (a + b) : a, "");
    const noSpCharMsg = msg.replace(/[*`_&\/\\#,+()~%.":?<>{}]/g, "").replace(/[$]/g, "s");
    const noDupCharMsg = removeDupChar(noSpCharMsg);
    if (swearWords.some(substring => noDupCharMsg.includes(substring)) || swearWords.some(substring => noSpCharMsg.includes(substring))) {
      message.delete();
      message.channel.send("BORK BORK (Hey, no swearing :( " + message.author + ")");
    }
    if (message.member.nickname != null && message.author.id != 267070467154771987
        && swearWords.some(substring => message.member.nickname.toLowerCase().includes(substring))) {
      message.member.setNickname("BORK BORK (No swearing :( )").catch(console.error);
    }
  }

  if (!message.content.startsWith(prefix) && !message.author.bot) {
    if (message.author.id == 166316295766278145) { // Reacts to Jared's messages
      message.react("💯")
        .then(() => message.react("🔥"))
        .then(() => message.react("👍"))
        .then(() => message.react("👌"))
        .then(() => message.react("💹"))
        .catch(console.error);
    }

    message.channel.fetchMessages({ limit: 3 }).then(messages => {
      let msgCount = 0, msgContent;
      let arr = messages.array();
      for (i = 0; i < 3; i++) {
        if (arr[i].content.toLowerCase() == "f" && !arr[i].author.bot) {
          msgContent = "f";
          msgCount++;
        } else if (arr[i].content == ":(" && !arr[i].author.bot) {
          msgContent = ":(";
          msgCount++;
        }
      }
      if (msgContent == "f" && msgCount >= 3) {
        message.channel.send("f");
      } else if (msgContent == ":(" && msgCount >= 3) {
        message.channel.send(":(");
      }
    }).catch(console.log);

    if (msg == "what" || msg == "what?" || msg == "wut") {
      message.channel.fetchMessages({ limit: 2 }).then(messages => {
        let arr = messages.array();
        let userMsg = arr[1].content.replace(/\*/g, "").toUpperCase();
        // First statement ensures a file with no comments was sent
        if (arr[1].content != "" && arr[1].member.user.id == message.author.id) {
          message.channel.send("***WOOF WOOF (YOU JUST SAID, " + userMsg + ")***");
        } else if (arr[1].content != "" && arr[1].member.nickname != null) {
          message.channel.send("***WOOF WOOF (" + arr[1].member.nickname.toUpperCase() + " SAID, " + userMsg + ")***");
        } else if (arr[1].content != "" && arr[1].member.nickname == null) {
          message.channel.send("***WOOF WOOF (" + arr[1].member.user.username.toUpperCase() + " SAID, " + userMsg + ")***");
        }
      }).catch(console.log);
    }
  } else if (message.author.bot) {
    return;
  } else {
    const userArgument = message.content.slice(prefix.length).trim().split(/ +/g); // Removes prefixes and extra spaces
    const commandName = userArgument.shift().toLowerCase(); // Changes commands to lowercase to ensure functionality regardless of capitalization
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
      command.execute(message, userArgument);
    } catch (error) {
      console.error(error);
      message.channel.send("BORK BORK (Sorry, " + message.author + ", but something went wrong.)");
    }
  }

  for (let i = 0; i < grammarCheck.length; i++) {
    if (msg.indexOf(grammarCheck[i].grammarError) !== -1) {
      message.channel.send("Woof woof! (Hey, did you know that it's actually spelt *\"" + grammarCheck[i].correction + "\"*? Have a nice day!)");
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  const swearingEnabled = require('./commands/noswearing.js')
  if (!swearingEnabled) {
    const swearWords = require('./commands/data/swearwords.js');
    const removeDupChar = s => s.split("").reduce((a, b) => (a[a.length - 1] != b) ? (a + b) : a, "");
    const noSpCharMsg = newMessage.content.toLowerCase().replace(/[*`_&\/\\#,+()~%.":?<>{}]/g, "").replace(/[$]/g, "s");
    const noDupCharMsg = removeDupChar(noSpCharMsg);
    if (swearWords.some(substring => noDupCharMsg.includes(substring)) || swearWords.some(substring => noSpCharMsg.includes(substring))) {
      newMessage.delete();
      newMessage.channel.send("BORK BORK (Hey, no swearing :( " + newMessage.author + ")");
    }
  }
});

client.login(token);
