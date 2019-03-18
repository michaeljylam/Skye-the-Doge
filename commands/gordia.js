module.exports = {
  name: 'gordia',
  aliases: ["g", "grodiag"],
  description: "I,m tri ying two lern how too spel. Lett,s C ...",
  execute(message) {
      const letters = ["", "a", "d", "g", "i", "r", "o"];
      const l2 = letters[Math.floor(Math.random() * letters.length)];
      const l3 = letters[Math.floor(Math.random() * letters.length)];
      const l4 = letters[Math.floor(Math.random() * letters.length)];
      const l5 = letters[Math.floor(Math.random() * letters.length)];
      const l6 = letters[Math.floor(Math.random() * letters.length)];

      message.channel.send("g" + l2 + l3 + l4 + l5 + l6 + "g");
  },
};
