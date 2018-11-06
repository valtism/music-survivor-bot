require("dotenv").config();
const readline = require("readline");
const prompts = require("prompts");
const Database = require("better-sqlite3");

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

function userAlbumQuery() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Search Albums: ", query => {
        rl.close();
        searchSpotify(query);
    });
}

async function searchSpotify(query) {
    try {
        const data = await spotifyApi.searchAlbums(query);
        if (!data.body.albums.items.length) {
            console.log('Search: "' + query + '" returned no results');
            userAlbumQuery();
        }
        const response = await getUserAlbumSelection(data);
        const albumData = await spotifyApi.getAlbum(response.albumId);

        const db = new Database("music-survivor.db");
        const albumInsertStatement = db.prepare(
            "INSERT INTO Album (AlbumId, Name, Artist, Image) VALUES (@AlbumId, @Name, @Artist, @Image)"
        );
        albumInsertStatement.run({
            AlbumId: albumData.body.id,
            Name: albumData.body.name,
            Artist: albumData.body.artists
                .map(artist => artist.name)
                .join(", "),
            Image: albumData.body.images[0].url
        });
    } catch (error) {
        console.error(error);
    }
}

async function getUserAlbumSelection(data) {
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
    return response;
}

// redditTest();
setSpotifyToken().then(userAlbumQuery);

function initDatabase() {
    const db = new Database("music-survivor.db");
}
