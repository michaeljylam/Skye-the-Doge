module.exports = {
  name: 'cuck',
  description: "Please save before you repeat my mistake...",
  async execute(message) {
    let happySet;
    await message.channel.fetchMessages({ limit: 5 }).then(messages => {
      let arr = messages.array();
      for (i = 0; i < 15; i++) {
        if (arr[i].content.includes("f!happy")) {
          happySet = true;
        }
      }
    }).catch(console.log);

    if (message.guild.members.get("416808821281783818").nickname == "🎊 Happy Sea Toad 🎊" || happySet) {
      try {
        message.guild.members.get("326520499100319745").setNickname("Eaien the Happy Cuck");
        message.channel.send("Woof woof! (Don't attack the Cucoos in Zelda...)");
      } catch (error) {
        console.error(error);
        message.channel.send("Bork bork! (Sorry, either I don't have the permissions to edit nicknames or something's wrong. :( )");
      }
    } else {
      message.channel.send("Woof woof! (Don't attack the Cucoos in Zelda...)");
    }
  },
};
