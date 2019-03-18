module.exports = {
  name: 'skye',
  description: "IS IT DINNER TIME",
  async execute(message) {
    message.channel.startTyping(2);
    await message.channel.send({ files: [{ attachment: "./commands/data/skyescritch.jpeg" }] }).catch(console.log);
    await message.channel.send("Woof!");
    message.channel.stopTyping(true);
  },
};
