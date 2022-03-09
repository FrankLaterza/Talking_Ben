// require the discord.js module
const fs = require("fs");
const { Client, Collection, Intents, Discord } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const cooldowns = new Map();
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

// // create a new Discord client
// const client = new Discord.Client();
// client.commands = new Discord.Collection();
// const cooldowns = new Discord.Collection();

const prefix = "~";

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  +console.log("Ready!");
});

// login to Discord with your app's token
// client.login(process.env.TOKEN);
client.login(process.env.TOKEN); // The token should be stored in your .env file

// this will run when a message is sent in the server form visable channels
client.on("message", (message) => {
  console.log("udpate");

  // the the mesage doesn't start with the prefix or was sent by the bot or the id was on the blacklist then ommit request
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/); // gets  the arguments
  const commandName = args.shift().toLowerCase(); // sets command name to all lowercase
  const command =
    client.commands.get(commandName) || // command
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!commandName) {
    return;
  } // if there is no command name then ommit request
  if (!command) {
    return;
  } // if there is no command name then ommit request
  if (!message.content) {
    return;
  } // if there is no message content then ommit request

  //!command.channel.includes(message.channel.name))

  // check for listed arguments
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }
  console.log("command detected"); //shows a command was registed

  try {
    console.log("launching command");
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.channel.send(`There was an error with that mama`);
  }
});

//https://discord.com/oauth2/authorize?client_id=950150084354514986&permissions=8&scope=bot

//%USERPROFILE%\AppData\Local\ms-playwright\firefox-1238\firefox
// ^^ this is where firefox is saved
//firefox -p  // this will open the profile manager under the firefox directory listed above
