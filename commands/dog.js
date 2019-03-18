module.exports = {
  name: 'dog',
  aliases: ["doge", "doggo", "doggy", "pup", "pupper", "puppers", "puppy"],
  description: "...I'm still the cutest dog, right? :(",
  execute(message) {
    const randomPuppy = require('random-puppy');
    randomPuppy("rarepuppers").then(url => {
      message.channel.send(url);
    })
  },
};
