//NPM Package
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
//for use with random.txt, reference Class Activity #14
var fs = require('fs');
var Spotify = require('node-spotify-api');

moment().format();
require("dotenv").config();

// Spotify keys access
// var spotify = new Spotify(keys.spotify);

// Take in the following commands via command line, this will determine the parameters of the search
var commands = ["concert-this",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says"]

var commandInput = process.argv[2];

//user query via command line
var query = process.argv[3];



// if user inputs "concert-this" & <artist/band>, AXIOs will perform a search against Bands In Town API "https://rest.bandsintown.com/artists/" + <artist or band>, + "/events?app_id=codingbootcamp"
// the following information will be console.log'd to the terminal: 
//  Name of the Venue
//  Venue Location
//  Date of the event in "MM/DD/YYYY" (moment.js)

// if user inputs "spotify-this-song" & <song name here>, this will search the spotify API (research node-spotify-api package)
// the follwoing information will be console.log'd to the terminal:
//  artist(s)
//  song's name
//  preview link of the song from Spotify
//  Album song is from
// if no results, default "The Sign" by Ace of Base

if (commandInput === commands[1]) {

    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}


// if user inputs "movie-this" & <movie name here>, AXIOs will perform a search of the movie title (reference Class Activity #18)
// the following information will be console.log'd to the terminal
//  Title of the movie - data.Title
//  Year the movie came out - data.Year
//  IMDB Rating of the movie - data.imdbRating
//  Rotten Tomatoes Rating - data.Ratings?
//  Country where the movie was produced - data.Country
//  Language of the movie - data.Lanuage
//  Plot of the movie (S or L?) - data.Plot
//  Actors in the movie - data.Actors

//Reference Class Activity #18
var movieName = query.split(" ").join("+");

if (commandInput === commands[2]) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var dataFormat = response.data;
            console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
        }
    );
}
// if no movie is entered, default "Mr. Nobody" & console.log statement

//if user inputs "do-what-it-syas", fs Node will tall on random.txt & call on LIRI's commands.