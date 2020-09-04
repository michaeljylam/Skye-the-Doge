module.exports = {
  name: 'happy',
  description: "We are all happy and so is that sea toad! :) 🎉",
  execute(message) {
    try {
      message.guild.members.get("416808821281783818").setNickname("🎊 Happy Sea Toad 🎊");
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
    } catch (error) {
      console.error(error);
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
    }
  },
};
