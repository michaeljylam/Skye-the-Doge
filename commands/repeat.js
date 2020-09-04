module.exports = {
  name: 'repeat',
  description: 'Can we repeat dinnertime that many times?',
  usage: '[number *(optional)*] [message]',
  execute(message, userArgument) {
    let [number, userMsg] = userArgument;
    let repeatedMsg = "";
    let msg = userArgument.splice(1).join(' ');

    if (number === 0) {
      message.channel.send("Bork bork! (Skye can't repeat that 0 times :( )");
    } else if (number % 1 === 0 && msg.length > 1) {
      for (i = 0; i < number; i++) {
        repeatedMsg += ` ${msg}`;
      }
      for (i = 0; i < repeatedMsg.length; i += 2000) {
        const msgToSend = repeatedMsg.substring(i, Math.min(repeatedMsg.length, i + 2000))
        message.channel.send(msgToSend);
      }
    } else if (number % 1 !== 0) {
      message.channel.send(message.content.replace("s!repeat ", ""));
    } else if (number % 1 === 0 && msg.length === 1) {
      for (i = 0; i < number; i++) {
        repeatedMsg += msg;
      }
      for (i = 0; i < repeatedMsg.length; i += 2000) {
        const msgToSend = repeatedMsg.substring(i, Math.min(repeatedMsg.length, i + 2000))
        message.channel.send(msgToSend);
      }
    }
  },
};
