module.exports = {
  name: 'stopplayingwith',
  aliases: ["unmute"],
  description: "Skye thinks you're tired. Let's take a break!",
  usage: '@user',
  execute(message) {
    let muteRoleID = message.guild.roles.cache.find(Role => Role.name.toLowerCase() === "busy").id;
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    if (message.mentions && message.mentions.everyone) {
      message.guild.members.cache.forEach(member => {
        if (member.roles.cache.find(role => role.id === muteRoleID)) {
          member.roles.remove(muteRoleID).catch(console.error);
        }
      })
      
      message.channel.send("Woof woof! (I had fun! Let's play fetch again some other time everyone!)");
    } else {
      if (user.roles.cache.find(role => role.id === muteRoleID)) {
        user.roles.remove(muteRoleID).catch(console.error);
        message.channel.send(`Woof woof! (I had fun! Let's play fetch again some other time! ${user})`);
      } else {
        message.channel.send(`Bork bork! (${user} isn't playing with me at the moment. :( )`);
      }
    }
  },
};
