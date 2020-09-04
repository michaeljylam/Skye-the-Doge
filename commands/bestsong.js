const Discord = require('discord.js');

module.exports = {
  name: 'bestsong',
  aliases: ["dj", "djskye", "music"],
  description: "I know a cat who can play you the best song ever!",
  async execute(message) {
    var songs = [
      {
        title: "Fatso's Theme",
        artist: "Keyboard Cat",
        path: "./commands/data/keyboardcat.m4a",
        artwork: "https://is3-ssl.mzstatic.com/image/thumb/Music/6b/40/8b/mzi.pbyberzs.jpg/939x0w.jpg"
      },
    ];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    if (!message.guild) return; // Stops remainder of code from loading when not in server
    if (message.guild.me.voice.connection) {
      message.guild.voice.connection.disconnect();
      message.channel.send("Woof! (I've disconnected from the voice channel.)")
    } else {
      if (message.member.voice.channel) {
        await message.member.voice.channel.join().then(connection => {
          const dispatcher = connection.play(randomSong.path);
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("#0099FF")
              .setTitle("▶️ Now Playing:")
              .setThumbnail(randomSong.artwork)
              .addField(randomSong.title, `by ${randomSong.artist}`)
          );
          dispatcher.on('finish', () => { connection.disconnect(); });
          dispatcher.on('error', error => { console.log(error); });
        }).catch(console.log);
      } else {
        message.channel.send(`Woof! (Sorry, ${message.author}, please join a voice channel first!)`);
      }
    }
  },
};
