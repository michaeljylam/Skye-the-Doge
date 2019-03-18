module.exports = {
  name: 'reddit',
  aliases: ["r"],
  description: "I hear there's a lot of food on this site...",
  usage: '[subreddit]',
  execute(message, userArgument) {
    const randomPuppy = require('random-puppy');
    if (userArgument.length < 1) {
      message.channel.send("Bork! (Hey, please type a subreddit!)")
    } else {
      randomPuppy(userArgument[0]).then(url => {
        if (url != null) {
          message.channel.send(url);
        } else {
          message.channel.send("Bork bork! (Hey, either you typed that wrong or that's not a subreddit. :( )")
        }
      })
    }
  },
};
