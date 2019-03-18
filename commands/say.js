module.exports = {
  name: 'say',
  description: "Say, how does food sound right now?",
  usage: '[message]',
  execute(message, userArgument) {
    const userMessage = userArgument.join(" ");
    message.delete().catch(console.error);
    message.channel.send(userMessage);
  },
};
