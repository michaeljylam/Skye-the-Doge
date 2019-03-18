const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'I love helping my hooman stay protecc from the squirrels!',
  usage: '[command]',
  execute(message, userArgument) {
    const data = [];
    const { commands } = message.client;

    if (!userArgument.length) {
      data.push("Woof woof! (Here are all of my commands):```Elm\n" + commands.map(command => command.name).join('\n')+ "``````(Send s!help [command] to get more information on a specific command.)```");
      return message.channel.send(data, { split: true })
    }

    const userCommand = userArgument[0].toLowerCase();
    const command = commands.get(userCommand) || commands.find(c => c.aliases && c.aliases.includes(userCommand));

    if (!command) {
      return message.channel.send("Bork bork! (Sorry, " + message.author + ", either I can\'t do *" + userCommand + "* yet or you misspelt it. :( )");
    }

    if (command.name) data.push(`**Name:** ${command.name}`);
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    message.channel.send(data, { split: true });
  },
};
