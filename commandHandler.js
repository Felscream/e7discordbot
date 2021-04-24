class CommandHandler {
  constructor(prefix) {
    this.prefix = prefix;
  }

  async handleMessage(message) {
    if (!this.isCommand(message.content)) {
      console.log("Not a command");
      return;
    }

    const args = message.content.slice(this.prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    console.log("command: ", command);
    console.log(args);

    switch (command) {
      case "ego":
        message.react("😀");
        message.reply("wow, what a great post");
        break;
      case "clear":
        let num = 2;

        if (args[0]) {
          num = parseInt(args[0]) + 1;
        }
        message.channel.bulkDelete(num);
        message.channel.send(`deleted  ${num - 1} posts for you`);
        break;
      default:
        console.log("Unrecognized command");
    }
  }

  isCommand(message) {
    return message.startsWith(this.prefix);
  }
}

module.exports = CommandHandler;
