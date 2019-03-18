module.exports = {
  name: 'memes',
  aliases: ["meme"],
  description: "? What's a me me?",
  execute(message) {
    const randomPuppy = require('random-puppy');
    randomPuppy("memes").then(url => {
      message.channel.send(url);
    })
  },
};
