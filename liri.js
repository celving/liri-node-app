require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var command = process.argv[2];

var parameter = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (var i = 0; i < 5; i++) {
                    console.log("Venue: " + response.data[i].venue.name +
                        "\nLocation: " + response.data[i].venue.city + " " + response.data[i].venue.region +
                        "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                        "\n----------------")
                }
            }

        ).catch(function(error) {
            if (err){
                console.log(error);
            };
        });
    case "spotify-this-song":
        spotify.search({ type: "track", query: parameter }, function(err, data) {
            if (err) {
                return console.log("Error occurred: " + err)
            }
            var firstTrack = data.tracks.items[0];

            console.log(firstTrack.name +
            "\nArtist: " + firstTrack.artists[0].name +
            "\nPreview: " + firstTrack.preview_url +
            "\nAlbum: " + data.tracks.items[0].album.name +
            "\n----------------");
        });


}