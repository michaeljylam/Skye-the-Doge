module.exports = {
  name: 'playwith',
  aliases: ["mute", "play", "silence"],
  description: "Are we going to play fetch? :3",
  usage: '@user',
  execute(message) {
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    if (user.id != 519688128601260034) {
      message.channel.send("Woof! (YAY :) 🎉 🎉)");
      user.addRole("540370007285170197")
        .then(message.channel.send("Woof! (YAY :) Let's play fetch!)"))
        .catch(console.error);
      message.channel.send("*(" + user + ", you can tell me to s!stopplayingwith you in #bot-commands, but do you really want to? :( )*");
    } else {
      message.channel.send("Woof! (Skye doesn't want to play alone :( Please mention someone I can play with!)");
    }
  },
};
