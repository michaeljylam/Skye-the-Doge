module.exports = {
  name: 'bestsong',
  description: "I know a cat who can play you the best song ever!",
  async execute(message) {
    if (!message.guild) return; // Stops remainder of code from loading when not in server
    if (message.guild.voiceConnection) {
      message.guild.voiceConnection.disconnect();
    } else {
      if (message.member.voiceChannel) {
        await message.member.voiceChannel.join().then(connection => {
          const dispatcher = connection.playFile("./commands/data/keyboardcat.m4a");
          dispatcher.on('end', () => { connection.disconnect(); });
          dispatcher.on('error', error => { console.log(error); });
        }).catch(console.log);
      } else {
        message.channel.send("Woof! (Sorry, " + message.author + ", please join a voice channel first!)");
      }
    }
  },
};
