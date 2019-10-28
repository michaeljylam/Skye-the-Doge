let swearingEnabled = true;

module.exports = {
  name: 'noswearing',
  aliases: ["noswear", "ns"],
  description: "Skye doesn't want to hear foul language. :(",
  execute(message) {
    if (swearingEnabled) {
      swearingEnabled = false;
      message.channel.send("Skye doesn't want to hear foul language. :(")
    } else {
      swearingEnabled = true;
      message.channel.send("Skye go take a snooze...")
    }
    module.exports = swearingEnabled;
  },
};
