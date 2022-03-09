const {
  VoiceConnectionStatus,
  AudioPlayerStatus,
  createAudioPlayer,
  joinVoiceChannel,
  createAudioResource,
  getVoiceConnections,
  SpeakingMap,
  audioSSRC,
  entersState,
  createListeningStream,
  VoiceReceiver,
} = require("@discordjs/voice");

const sound_files = [
  "./sounds/Uhg.mp3",
  "./sounds/Ben.mp3",
  "./sounds/Yes.mp3",
  "./sounds/No.mp3",
  "./sounds/Hohoho.mp3",
];

let timerFlag = 1;

// grets a decimal number
// const rand = Math.random() * sound_files.length;

module.exports = {
  name: "ben",
  description: "this is a template",
  cooldown: 10,
  args: false,

  async execute(message, args, client) {
    //get the voice channel ids
    if (message.member.voice.channelId === null) {
      message.channel.send("ben?");
      return 0;
    }

    const voiceChannelId = message.member.voice.channelId;
    const voiceChannel = client.channels.cache.get(voiceChannelId);
    const guildId = message.guild.id;

    //create audio playerz
    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    player.on("error", (error) => {
      console.error(`Error: ${error.message} with resource`);
    });

    //create and play audio
    let resource = createAudioResource("./sounds/Ben.mp3");
    player.play(resource);

    //create the connection to the voice channel
    const connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: guildId,
      selfDeaf: false,
      selfMute: false,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = connection.subscribe(player);

    // subscription could be undefined if the connection is destroyed!
    if (subscription) {
      // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
      setTimeout(() => subscription.unsubscribe(), 30_000);
    }

    const receiver = connection.receiver;
    receiver.speaking.on("end", () => {
      if (timerFlag) {
        timerFlag = 0;

        flagToggle();
        console.log("stoped talking. flag turned off");
        //create and play audio
        const rand = getRandomInt();
        console.log(sound_files[rand]);
        console.log(rand);

        // Subscribe the connection to the audio player (will play audio on the voice connection)
        const subscription = connection.subscribe(player);

        const resource = createAudioResource(sound_files[rand]);
        player.play(resource);
        //create the connection to the voice channel
      }
    });
  },
};

// get random whole number with max of sounds files
function getRandomInt() {
  const min = Math.ceil(0);
  const max = Math.floor(sound_files.length - 1);
  const ret = Math.floor(Math.random() * (max - min + 1)) + min;
  return ret;
}

function flagToggle() {
  setTimeout(() => {
    timerFlag = 1;
    console.log("flag ready");
  }, 4000);
}
