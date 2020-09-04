module.exports = {
  name: 'ping',
  description: "Average heartbeat ping of the websocket... Admittedly, I don't know what that means. I'm a dog.",
  execute(message) {
    message.channel.send(`Woof woof! (Ping pong is one of my favourites. I may be a dog but that doesn't mean I can play sports! Just... play me on Wii Play because otherwise I'll eat the ball...)\n(Ping: ${message.client.ping} ms)`);
  },
};
