const fetch = require('node-fetch')

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
  const taskID = await response.json()

  // console.log(json);

  return taskID
};

exports.fetchTaskID = fetchTaskID