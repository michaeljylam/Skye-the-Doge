module.exports = {
  name: 'nickname',
  aliases: ["name", "rename"],
  description: 'Hey, do you think you can make my hooman happier?',
  usage: '@user [nickname]',
  execute(message, userArgument) {
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    try {
      if (user.id === 267070467154771987) {
        message.channel.send("...");
        message.member.setNickname("BORK BORK (Hey :( )")
      } else {
        if (userArgument[0] !== user) {
          var nickname = userArgument.join(' ');
        } else {
          var nickname = userArgument.splice(1).join(' ');
        }

        if (nickname.length === 0) {
          user.setNickname(nickname).then(message.channel.send("Woof woof! (OK, I removed " + user.user.username + "'s nickname!)"));
        } else if (nickname.length <= 32) {
          if (user.nickname != null) {
            var oldNickname = user.nickname;
          } else {
            var oldNickname = user.user.username;
          }
          user.setNickname(nickname).then(message.channel.send("Woof woof! (OK, I changed " + oldNickname + "'s nickname to " + user + "!)"));
        } else {
          message.channel.send("Bork bork! (Hey, that nickname is too long. :( You currently have " + nickname.length + " characters, and you can only have a maximum of 32. " + message.author + ")");
        }
      }
    } catch (error) {
      console.error(error);
      message.channel.send("Bork bork! (Sorry, either I don't have the permissions to edit nicknames or something's wrong. :( )");
    }
  },
};
