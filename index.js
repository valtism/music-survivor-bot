require("dotenv").config();

const snoowrap = require("snoowrap");
const r = new snoowrap({
    userAgent: "music-survivor-bot",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

// r.getSubreddit("valtism")
//     .getHot()
//     .map(post => post.title)
//     .then(console.log);

const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

async function setSpotifyToken() {
    try {
        const data = await spotifyApi.clientCredentialsGrant();
        console.log("The access token expires in " + data.body["expires_in"]);
        console.log("The access token is " + data.body["access_token"]);

        // Save the access token so that it's used in future calls
        return spotifyApi.setAccessToken(data.body["access_token"]);
    } catch (error) {
        return console.log("Spotify access token error", error);
    }
}

async function runSpotify() {
    try {
        const elvisAlbums = await spotifyApi.getArtistAlbums(
            "43ZHCT0cAZBISjO8DG9PnE"
        );
        console.log("Artist's albums: ", elvisAlbums.body);
    } catch (error) {
        console.error(error);
    }
}

setSpotifyToken().then(runSpotify);
