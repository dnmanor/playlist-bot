const TeleBot = require("telebot");
const {
  isValidURL,
  isSupportedPlatform,
  getDestinationPlatform,
} = require("./main/validators");
const { fetchTaskID, checkTaskStatus } = require("./main/fetch-playlist");

const { trimURL } = require("./main/sanitizers");

require("dotenv").config();

//Create new bot instance
const bot = new TeleBot(process.env.BOT_API_KEY);

//Listen for "start" or "hello"  and trigger res
bot.on(["/start", "/hello"], (msg) => {
  msg.reply.text(
    `🎊🎊🎊🎊🎊🎊 \nWelcome ${msg.chat.first_name}! I am here to do one thing for you and one thing only.\nThat is, convert between your Apple and Spotify playlists.\nSo go ahead and share the links with me, share and enjoy your music.`
    );
});

//process playlist url(user input)
bot.on("text", async (msg) => {

  if (msg.text.startsWith('/')) return

  const messageObject = msg;
  const urlInput = messageObject.text;

  const url = await trimURL(urlInput);

  
  const validURL = await isValidURL(url);

  if (!validURL) {
    msg.reply.text("Enter valid Apple Music or Spotify playlist url/link.");
  }

  const supportedPlatform = await isSupportedPlatform(url);

  if (!supportedPlatform) {
    msg.reply.text("Platform not supported at the moment");
    throw new Error("platform not supported");
  } else {
    try {
      //get conversion destination
      const destination = await getDestinationPlatform(url);

      //get task ID
      const taskID = await fetchTaskID(url, destination);

      let task = await checkTaskStatus(taskID);
      let playlist = task.result;
      let taskStatus = task.state;

      async function checkForOtherStateUpdates() {
        task = await checkTaskStatus(taskID);
        playlist = task.result;
        taskStatus = task.state;

        console.log("Checking for different state ...");

        if (taskStatus === "SUCCESS") {
          msg.reply.text(
            `${playlist} \nHere you go, your ${destination} playlist link. Enjoy your music and share!`
          );
        } else {
          throw new Error();
        }
      }

      //check for celery status and move on from there with Errors or success
      if (taskStatus === "SUCCESS") {
        msg.reply.text(
          `${playlist} \nHere you go, your ${destination} playlist link. Enjoy your music and share!`
        );
      } else if (taskStatus === "PENDING" || "PROGRESS") {
        setTimeout(checkForOtherStateUpdates, 1500);
      }

    } catch (error) {
      msg.reply.text("Oops, something went wrong. Please Try again.");
    }
  }
});

bot.start();
