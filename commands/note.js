module.exports = {
  name: 'note',
  description: "Skye likes to toot as well! *I didn't say an instrument though...*",
  execute(message) {
    const notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"];
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    message.channel.send(`Woof! (Play in ${randomNote}!)`);
  },
};
