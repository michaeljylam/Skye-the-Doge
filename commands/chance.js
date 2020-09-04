module.exports = {
  name: 'chance',
  aliases: ["probability"],
  description: "These numbers are as reliable as my hooman's Wi-Fi connection...",
  usage: '[question]',
  execute(message, userArgument) {
    if (userArgument.length > 0) {
      const randomInt = Math.floor(Math.random() * 101);
      message.channel.send(`Woof woof! ("${message.author}, there's a ${randomInt}% chance of that happening.)`);
    } else {
      message.channel.send(`Woof! (Please ask a question ${message.author}!)`);
    }
  },
};
