module.exports = {
  name: 'stopplayingwith',
  aliases: ["unmute"],
  description: "Skye thinks you're tired. Let's take a break!",
  usage: '@user',
  execute(message) {
    let muteRoleID = message.guild.roles.find(Role => Role.name.toLowerCase() === "busy").id;
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    if (user.roles.find(role => role.id === muteRoleID)) {
      user.removeRole(muteRoleID).catch(console.error);
      message.channel.send(`Woof woof! (I had fun! Let's play fetch again some other time! ${user})`);
    } else {
      message.channel.send(`Bork bork! (${user} isn't playing with me at the moment. :( )`);
    }
  },
};
