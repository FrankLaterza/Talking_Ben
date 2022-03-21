import { Message } from "discord.js";

module.exports = {
  name: "template",
  description: "this is a template",
  cooldown: 1,
  args: true,

  execute(message: Message, args: any[]) {
    //uncomment if you have mods
    //checkMods(args, siteData, modData);
  },
};
