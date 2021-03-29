const TeleBot = require("telebot");
const {
  isValidURL,
  isSupportedPlatform,
  getDestinationPlatform,
} = require("./main/validators");
const { fetchTaskID } = require("./main/fetch-playlist");

require("dotenv").config();

//Create new bot instance
const bot = new TeleBot(process.env.BOT_API_KEY);

//Liten for "start" or "hello"  and trigger res
bot.on(["/start", "/hello"], (msg) => {
  msg.reply.text(
    `Welcome ${msg.chat.first_name}! I am here to do one thing for you and one thing only. 
    That is, convert between your Apple and Spotify playlists. 
    So go ahead and share the links with me, share and enjoy your music. `
  );
});

//process playlist url(user input)
bot.on("text", async (msg) => {
  const validURL = await isValidURL(msg);

  if (!validURL) {
    msg.reply.text("Enter valid Apple Music or Spotify playlist url/link.");
  }

  const supportedPlatform = isSupportedPlatform(msg);

  if (!supportedPlatform) {
    msg.reply.text("Platfprm not supported at the moment");
    throw new Error("platform not supported");
  } else {
    try {
      //get conversion destination
      const destination = await getDestinationPlatform(msg);
      //get task ID
      const taskID = await fetchTaskID(msg, destination);

      //check for task ID Errors
      if (taskID === "") {
        throw new Error();
      }

      //do something with task ID
    } catch (error) {
      msg.reply.text("Oops, something went wrong. Please Try again.");
    }
  }
});

bot.start();
