const fetch = require("node-fetch");

const fetchTaskID = async (url, platform) => {
  const response = await fetch("https://playlistor.io/playlist", {
    method: "POST",

    mode: "cors",

    referrer: process.env.REQUEST_REFFERER,

    referrerPolicy: "strict-origin-when-cross-origin",

    body: JSON.stringify({ playlist: `${url}`, platform: `${platform}` }),

    headers: {
      "Content-Type": "application/json",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      "music-user-token": "undefined",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
  });
  const data = await response.json();

  const taskID = data.task_id;

  return taskID;
};

const checkTaskStatus = async (taskID) => {
  const response = await fetch(
    `https://playlistor.io/celery-progress/${taskID}/`,
    {
      method: "GET",
      mode: "cors",
      referrer: process.env.REQUEST_REFFERER,

      referrerPolicy: "strict-origin-when-cross-origin",
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
    }
  );
  const taskStatus = await response.json();
  return taskStatus;
};


exports.fetchTaskID = fetchTaskID;

exports.checkTaskStatus = checkTaskStatus;
