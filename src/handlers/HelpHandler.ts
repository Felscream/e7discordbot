import { Message } from "discord.js";
import HelpMenu from "../menus/HelpMenu";

function displayHelp(message: Message, args: string[]) {
  const helpMenu = new HelpMenu(message.channel, message.author.id);
  helpMenu.start(args);
}

export default displayHelp;
