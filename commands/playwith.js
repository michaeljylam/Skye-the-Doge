module.exports = {
  name: 'playwith',
  aliases: ["mute", "play", "silence"],
  description: "Are we going to play fetch? :3",
  usage: '@user',
  execute(message) {
    let muteRoleID = message.guild.roles.cache.find(Role => Role.name.toLowerCase() === "busy").id;
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    if (message.mentions && message.mentions.everyone) {
      message.guild.members.cache.forEach(member => {
        if (!member.user.bot && member.user.presence.status == "online") {
          member.roles.add(muteRoleID).catch(console.error);
        }
      })
    } else {
      if (user.id != 556309215912656916) {
        message.channel.send("Woof! (YAY :) 🎉 🎉)");
        user.roles.add(muteRoleID)
          .then(message.channel.send("Woof! (YAY :) Let's play fetch!)"))
          .catch(console.error);
        message.channel.send(`*("${user}, you can tell me to s!stopplayingwith you in #bot-commands, but do you really want to? :( )*`);
      } else {
        message.channel.send("Woof! (Skye doesn't want to play alone :( Please mention someone I can play with!)");
      }
    }
  },
};
