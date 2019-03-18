module.exports = {
  name: 'art',
  aliases: ["artwork"],
  description: "Is this what you hoomans do instead of playing fetch?",
  execute(message) {
      const i = Math.floor(Math.random() * (36 - 1)) + 1;
      const randomImage = "./commands/data/art/" + i + ".jpg";

      message.channel.startTyping();
      message.channel.send({ files: [{ attachment: randomImage }] }).catch(console.log);
      message.channel.stopTyping(true);
  },
};
