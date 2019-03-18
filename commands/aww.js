module.exports = {
  name: 'aww',
  aliases: ["cute"],
  description: "Skye likes cute things, like hoomans!",
  execute(message) {
    const randomPuppy = require('random-puppy');
    randomPuppy("aww").then(url => {
      message.channel.send(url);
    })
  },
};
