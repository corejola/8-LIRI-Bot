//NPM Package
require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
// console.log(keys);
//for use with random.txt, reference Class Activity #14
var fs = require('fs');
var Spotify = require('node-spotify-api');

// moment().format();


// Spotify keys access
var spotify = new Spotify(keys.spotify);

// Take in the following commands via command line, this will determine the parameters of the search
var commands = ["concert-this",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says"]

var commandInput = process.argv[2];

//create normalized value prior to APIs
var query = process.argv.slice(3);
query = query.join(" ");

// if user inputs "concert-this" & <artist/band>, AXIOs will perform a search against Bands In Town API "https://rest.bandsintown.com/artists/" + <artist or band>, + "/events?app_id=codingbootcamp"
// the following information will be console.log'd to the terminal: 
//  Name of the Venue
//  Venue Location
//  do you need geocoder for the venue location?
//  Date of the event in "MM/DD/YYYY" (moment.js)

function bandsInTown(response) {
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    console.log("Object Empty: " + isEmpty(response.data))
    if (response.data.length === 0) {
        console.log("No Shows for this Artist")
    } else {
        for (var i = 0; i < 5; i++) {
            var venueName = response.data[i].venue.name;
            var venueCity = response.data[i].venue.city;
            var venueState = response.data[i].venue.region;
            var venueCountry = response.data[i].venue.country;
            var showDate = moment(response.data[i].datetime).format("MM-DD-YYYY");
            console.log("\n")
            console.log("Name of Venue: " + venueName);
            console.log("Location of Show: " + venueCity + ", " + venueState + ", " + venueCountry);
            console.log("Date of Show: " + showDate);
            console.log("-----------")
        };
    };
};

//Bands In Town
if (commandInput === commands[0]) {
    var bandQuery = query.split(" ").join("%20");
    var queryUrl = 'https://rest.bandsintown.com/artists/' + bandQuery + '/events?app_id=trilogy';
    axios.get(queryUrl).then(
        function (response) {
            //review for in loop to go through the provided object
            //error response if NO shows are upcoming
            bandsInTown(response);
        });
};

function spotifyThisSong(data) {
    if (data.tracks.items.length === 0) {
        console.log("No tracks found")
    } else {
        for (var i = 0; i < 5; i++) {
            console.log("\n----------------------")
            //  artist(s)
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name)
            //  song's name
            console.log("Track Name: " + data.tracks.items[i].name)
            //  Album song is from
            console.log("Album: " + data.tracks.items[i].album.name)
            //  preview link of the song from Spotify
            console.log("Link to Spotify: " + data.tracks.items[i].external_urls.spotify)
        };
    }
}

//Spotify This Song
if (commandInput === commands[1]) {

    spotify.search({ type: 'track', query: query, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        spotifyThisSong(data);
    });
    // if no results, default "The Sign" by Ace of Base
};


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

function movieThis(response) {
    var dataFormat = response.data;
    if (dataFormat.Title === undefined) {
        console.log("\n----------------------")
        console.log("No Movie found.")
        console.log("Please try search again.")
        console.log("------------------------")
    } else {
        console.log("\n----------------------")
        console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
    };
};
//Movie This
if (commandInput === commands[2]) {
    var movieName = query.split(" ").join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            movieThis(response);
        }
    );
};
// if no movie is entered, default "Mr. Nobody" & console.log statement

//if user inputs "do-what-it-syas", fs Node will call on random.txt & call on LIRI's commands.