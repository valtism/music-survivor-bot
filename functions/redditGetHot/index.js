const snoowrap = require("snoowrap");

const r = new snoowrap({
    userAgent: "music-survivor-bot",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

async function redditTest() {
    try {
        const titles = await r.getHot().map(post => post.title);
        console.log(titles);
        return titles;
    } catch (error) {
        console.error(error);
    }
}

exports.redditGetHot = async (req, res) => {
    const titles = await redditTest();
    res.send(titles);
};
