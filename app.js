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

client.once('ready', () => {
  console.log('Woof!');
  client.user.setActivity("with a ball of yarn", { type: "PLAYING" })
});

client.on('message', message => {
  const msg = message.content.toLowerCase();
  const swearingEnabled = require('./commands/noswearing.js');
  const grammarCheck = require('./commands/data/grammarcheck.js');

  if (!swearingEnabled && !message.author.bot) {
    const swearWords = require('./commands/data/swearwords.js');
    const removeDupChar = s => s.split("").reduce((a, b) => (a[a.length - 1] != b) ? (a + b) : a, "");
    const alphanumericOnlyMsg = msg.replace(/[^a-z0-9$]/g, "").replace(/[$]/g, "s");
    const noDupCharMsg = removeDupChar(alphanumericOnlyMsg);
    if (swearWords.some(substring => noDupCharMsg.includes(substring)) || swearWords.some(substring => alphanumericOnlyMsg.includes(substring))) {
      message.delete();
      message.channel.send(`BORK BORK (Hey, no swearing :( ${message.author})`);
    }
    if (message.member.nickname != null && message.author.id != 267070467154771987
        && swearWords.some(substring => message.member.nickname.toLowerCase().includes(substring))) {
      message.member.setNickname("BORK BORK (No swearing :( )").catch(console.error);
    }
  }

  if (!message.content.startsWith(prefix) && !message.author.bot) {
    message.channel.messages.fetch({ limit: 3 }).then(messages => {
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
      if (msgContent === "f" && msgCount === 3) {
        message.channel.send("f");
        msgCount = 0;
      } else if (msgContent === ":(" && msgCount === 3) {
        message.channel.send(":(");
        msgCount = 0;
      }
    }).catch(console.log);

    if (Math.random() <= 0.3 && (msg === "what" || msg === "what?" || msg === "wut")) {
      message.channel.messages.fetch({ limit: 1, before: message.id }).then(messages => {
        let prevMsg = messages.array()[0];
        let userMsg = prevMsg.content.replace(/\*/g, "").toUpperCase();
        // First statement ensures a file with no comments was sent
        if (prevMsg.content !== "" && prevMsg.member.user.id == message.author.id) {
          message.channel.send(`***WOOF WOOF (YOU JUST SAID, "${userMsg}")***`);
        } else if (prevMsg.content !== "" && prevMsg.member.nickname != null) {
          message.channel.send(`***WOOF WOOF (${prevMsg.member.nickname.toUpperCase()} SAID, "${userMsg}")***`);
        } else if (prevMsg.content !== "" && prevMsg.member.nickname == null) {
          message.channel.send(`***WOOF WOOF (${prevMsg.member.user.username.toUpperCase()} SAID, "${userMsg}")***`);
        }
      }).catch(console.log);
    }

    const alphanumericOnlyMsg = msg.replace(/[^a-z0-9]/g, "")
    if (alphanumericOnlyMsg === "k") {
      message.delete();
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
      message.channel.send(`BORK BORK (Sorry, ${message.author}, but something went wrong.)`);
    }
  }

  for (let i = 0; i < grammarCheck.length; i++) {
    if (msg.indexOf(grammarCheck[i].grammarError) !== -1) {
      message.react("🐶")
        .then(() => message.reactions.removeAll())
        .catch(error => {
          console.error(error)
          message.member.setNickname(`Woof woof! (It's ${grammarCheck[i].correction}!)`).catch(console.error);
      })
      message.channel.send(`Woof woof! (Hey, did you know that it's actually spelt *"${grammarCheck[i].correction}"*? Have a nice day!)`);
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  const swearingEnabled = require('./commands/noswearing.js')
  if (!swearingEnabled) {
    const swearWords = require('./commands/data/swearwords.js');
    const removeDupChar = s => s.split("").reduce((a, b) => (a[a.length - 1] !== b) ? (a + b) : a, "");
    const alphanumericOnlyMsg = newMessage.content.toLowerCase().replace(/[^a-z0-9$]/g, "").replace(/[$]/g, "s");
    const noDupCharMsg = removeDupChar(alphanumericOnlyMsg);
    if (swearWords.some(substring => noDupCharMsg.includes(substring)) || swearWords.some(substring => alphanumericOnlyMsg.includes(substring))) {
      newMessage.delete();
      newMessage.channel.send(`BORK BORK (Hey, no swearing :( ${newMessage.author})`);
    }
  }
});

client.on('messageDelete', async message => {
  if (!message.guild) return;

	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	const { executor, target } = deletionLog;
  const channel = message.guild.channels.cache.find(ch => ch.name === 'server-logs');

  if (message.content === '') {
    if (message.attachments.size > 0) {
      message.content = "Message only contained the below attachment.";
    } else {
      return;
    }
  }

  if (target.id === message.author.id) {
    channel.send(`**${new Date().toLocaleString('en-US')}**: A message from ${message.author.username} was deleted by ${executor.username}:\n> ${message}`);
  } else {
    channel.send(`**${new Date().toLocaleString('en-US')}**: A message from ${message.author.username} was deleted either by themselves or by a bot:\n> ${message}`);
  }

  if (message.attachments.size > 0) {
    channel.send(message.attachments.first().proxyURL)
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'server-logs');
  channel.send(`**${new Date().toLocaleString('en-US')}**: ${member} has joined the server.`);
  if (member.id !== 186602980563222528) { // If new member is not Gordia
    member.roles.set(['559938493518970902']).catch(console.error)
    if (member.id == 326520499100319745) { // Ian
      member.roles.set(['562002042512474132', '326520499100319745', '559938493518970902', '559933178152747049', '689084435785711666']).catch(console.error)
    }
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.id == 326520499100319745 && oldMember.roles.cache.size > newMember.roles.cache.size) { // Ian
    newMember.roles.set(['562002042512474132', '326520499100319745', '559938493518970902', '559933178152747049', '689084435785711666']).catch(console.error)
  }
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'server-logs');
  let listOfRoles = []
  member.roles.cache.each(role => listOfRoles.push(role.name.replace('@', '')))
  channel.send(`**${new Date().toLocaleString('en-US')}**: ${member} has left the server.\nTheir roles were: ${listOfRoles.join(", ")}`);
});

client.login(token);
