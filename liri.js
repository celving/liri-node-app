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
        if (!parameter){
            parameter = "The Sign";
        };
        
        
        spotify.search({ type: "track", query: parameter }, function(err, data) {
            if (err) {
                return console.log("Error occurred: " + err)
            }
            var firstTrack;
            
            if (parameter === "The Sign"){
                firstTrack = data.tracks.items[2];
            }

            else {
                firstTrack = data.tracks.items[0];
            }
            var preview = "";

            if (firstTrack.preview_url === null){
                preview = "Unavailable"
            }

            else {
                preview = firstTrack.preview_url;
            };

            console.log(firstTrack.name +
            "\nArtist: " + firstTrack.artists[0].name +
            "\nPreview: " + preview +
            "\nAlbum: " + data.tracks.items[0].album.name +
            "\n----------------");
        });
    case "movie-this":
        if (!parameter) {
            parameter = "Mr. Nobody";
        };
            axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy").then(
                function(response) {
                  console.log(response.data.Title +
                    "\nReleased: " + response.data.Year +
                    "\niMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nProduced in " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nActors: " + response.data.Actors +
                    "\n" + response.data.Plot);
                })
                .catch(function(error) {
                  if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                  } else if (error.request) {
                    console.log(error.request);
                  } else {
                    console.log("Error", error.message);
                  }
                  console.log(error.config);
                });


};