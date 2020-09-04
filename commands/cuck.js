module.exports = {
  name: 'cuck',
  description: "Please save your game before you repeat my mistake...",
  async execute(message) {
    try {
      message.guild.members.get("326520499100319745").setNickname("Eaien the Happy Cuck");
      message.channel.send("Woof woof! (Don't attack the Cucoos...)");
    } catch (error) {
      console.error(error);
      message.channel.send("Woof woof! (Don't attack the Cucoos...)");
    }
  },
};
