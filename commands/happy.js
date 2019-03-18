module.exports = {
  name: 'happy',
  description: "We are all happy and so is that sea toad! :) 🎉",
  execute(message) {
    if (message.author.id == 326520499100319745) {
      try {
        message.guild.members.get("416808821281783818").setNickname("🎊 Happy Sea Toad 🎊");
        message.channel.send("Woof! (YAY :) 🎉 🎉)");
      } catch (error) {
        console.error(error);
        message.channel.send("Bork bork! (Sorry, either I don't have the permissions to edit nicknames or something's wrong. :( )");
      }
    } else {
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
    }
  },
};
