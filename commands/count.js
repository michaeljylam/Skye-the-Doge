module.exports = {
  name: 'count',
  description: "I may just have paws, but I can still count! Catch me in AP Calculus! :3",
  usage: "[message]  *or*  s!count @user",
  execute(message) {
    // Counts username/nickname if a user is mentioned
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0) {
      let user = message.mentions.members.first().user.username; // Defaults to user's username if their nickname is not set
      if (message.mentions.members.first().nickname !== null)
        user = message.mentions.members.first().nickname;

      // Replies differently when message mentions Gordia
      if (message.mentions.members.first().id === 186602980563222528 && message.mentions.members.first().nickname.includes("/")) {
        if (user.length < 32) {
          if (user.length === 1) {
            message.channel.send("Woof! (There's **1** slash in Gordia's nickname.)");
          } else if (user.length > 1 && user.length <= 31)
            message.channel.send("Woof woof! (There are **" + user.length + "** slashes in Gordia's nickname.)");
            message.channel.send("(For Vinay... there's a maximum of 32 characters in a nickname.)");
        } else {
          message.channel.send("Woof! (Are we embarrassing Gordia? If so, there's **32** slashes.)");
        }
      } else {
        if (message.mentions.members.first().nickname === null) {
          message.channel.send("Woof! (There are **" + user.length + "** characters in that username.)");
        } else {
          if (user.length === 1) {
            message.channel.send("Woof woof! (There's **1** character in that nickname.)");
          } else {
            message.channel.send("Woof woof! (There's **" + user.length + "** characters in that nickname.)");
          }
          message.channel.send("(For Vinay... there's a maximum of 32 characters in a nickname.)")
        }
      }
    } else { // Counts message normally (excluding prefix, command and space) if no users are mentioned
      message.channel.send("Woof! (There are **" + (message.content.length - 8) + "** characters in your message.)");
    }
  },
};
