require("dotenv").config();
const snoowrap = require("snoowrap");

const r = new snoowrap({
    userAgent: "music-survivor-bot",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

r.getSubreddit("valtism").submitLink({
    title: "First script post :)",
    url: "https://i.imgur.com/q0cFFdv.gif"
});
