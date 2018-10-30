require("dotenv").config();
const readline = require("readline");
const prompts = require("prompts");

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
    } catch (error) {
        console.error(error);
    }
}

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
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Search Albums: ", query => {
        spotifyApi.searchAlbums(query).then(async data => {
            try {
                const choices = data.body.albums.items.map(album => {
                    return {
                        title: album.artists[0].name + " - " + album.name,
                        value: album.id
                    };
                });
                let questions = {
                    type: "select",
                    name: "albumId",
                    message: "Select an album",
                    choices: choices
                };
                const response = await prompts(questions);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        });
    });

    // const elvisAlbums = await spotifyApi.getArtistAlbums(
    //     "43ZHCT0cAZBISjO8DG9PnE"
    // );
    // console.log("Artist's albums: ", elvisAlbums.body);
}

// redditTest();
setSpotifyToken().then(runSpotify);
