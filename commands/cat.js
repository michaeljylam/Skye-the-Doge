module.exports = {
  name: 'cat',
  aliases: ["kitten", "kitty"],
  description: "I wonder if Keyboard Cat is somewhere in these posts... Speaking of, you should try `s!bestsong` !",
  execute(message) {
    const randomPuppy = require('random-puppy');
    randomPuppy("kitty").then(url => {
      message.channel.send(url);
    })
  },
};
