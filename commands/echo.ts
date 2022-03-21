import { Message } from "discord.js";

module.exports = {
    name: 'echo',
    description: 'delete message and reprad args',
    cooldown: 1,
    args: true,
    execute(message: Message, args: any[]) {


        console.log('echo command ' + args);
        message.delete();
        message.channel.send(message.content.substring(6));
        return 0;


    },
};