module.exports = {
  name: 'happy',
  description: "We are all happy and so is that sea toad! :) 🎉",
  async execute(message) {
    try {
      message.guild.members.fetch("416808821281783818").then(member => {
        member.setNickname("🎊 Happy Sea Toad 🎊");
      });
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
    } catch (error) {
      console.error(error);
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
    }
  },
};
