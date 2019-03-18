module.exports = {
  name: 'call',
  aliases: ["bark", "bork", "spam"],
  description: "DID SOMEONE RING THE DOORBELL",
  usage: '@user',
  execute(message) {
    let user = message.member;
    if (message.mentions && message.mentions.members && message.mentions.members.size > 0)
      user = message.mentions.members.first();

    for (i = 0; i < 10; i++) {
      user.send("**BORK BORK**").catch();
    }
  },
};
