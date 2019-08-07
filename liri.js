require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");


var command = process.argv[2];

var parameter = process.argv.slice(3).join(" ");

switch (command){
    case "concert-this":
    axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp").then(
        function(response) {
            for (var i = 0; i < 5; i++){
                console.log("Venue: " + response.data[i].venue.name +
                "\nLocation: " + response.data[i].venue.city + " " + response.data[i].venue.region +
                "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
                "\n----------------")
            }
        }
        
    );
}