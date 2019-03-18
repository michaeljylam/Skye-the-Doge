module.exports = {
  name: '8ball',
  aliases: ["fortune", "y/n", "yn"],
  description: "This ball looks weird... I think it says something there too.",
  usage: '[question]',
  execute(message, userArgument) {
    const responses = [
      "yes.",
      "does Jacob have the cutest dog?",
      "did Ms. Drew erase Gordia's diagram?",
      "is Graham stressed at the moment?",
      "is Ian tired?",
      "is Jared the best clarinet tooter?",
      "did Michael get a 4++ for \"guessing and checking\"?",
      "no.",
      "is *gouvernement* the correct spelling?",
      "did Graham do better than his sister in music?",
      "did JJ get 100 in biology?",
      "did Matteo finish his bio homework?",
      "did Michael eat breakfast today?",
      "is Michael going to sleep at 11 tonight?",
      "did Vinay get a 4 in neatness for colouring?",
      "does Vinay like Magic?",
      "was the February 2019 Nintendo Direct good?",
      "is Animal Crossing on the Switch yet?",
      "maybe.",
      "uphap.",
      "50% chance.",
      "did Ian send memes today?",
      "is Ian working?",
      "is Jacob doing his homework?",
      "is Michael working? If so, is Jaime working?",
      "is Vinay going to get a 90 average?",
      "did Vinay make a sandwich today?",
      "did somebody do the vote today?",
      "was there Me to We this week?"
    ];

    if (userArgument.length > 0) {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      message.channel.send("Woof woof! (" + message.author + ", " + randomResponse + ")");
    } else {
      message.channel.send("Woof! (Please ask a question " + message.author + "!)");
    }
  },
};
