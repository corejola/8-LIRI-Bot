require("dotenv").config();
var moment = require('moment');
var axios = require("axios");
var keys = require("./keys.js");
var fs = require('fs');
var Spotify = require('node-spotify-api');

// Spotify keys access
var spotify = new Spotify(keys.spotify);
var commands = ["concert-this",
    "spotify-this-song",
    "movie-this",
    "do-what-it-says"]
var commandInput = process.argv[2];

//create normalized value prior to APIs
var query = process.argv.slice(3);
query = query.join(" ");

function spotifyThisSong(query) {
    spotify.search({ type: 'track', query: query, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        if (data.tracks.total === 0) {
            console.log("No tracks found, so checkout this sweet gem!");
            spotify.search({ type: 'track', query: "The Sign", limit: 20 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\n----------------------")
                console.log("\nArtist: " + data.tracks.items[7].album.artists[0].name + "\nTrack Name: " + data.tracks.items[7].name + "\nAlbum: " + data.tracks.items[7].album.name + "\nLink to Spotify: " + data.tracks.items[7].external_urls.spotify)
            });
        } else {
            spotify.search({ type: 'track', query: query, limit: 5 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                for (var i = 0; i < 5; i++) {
                    console.log("\n----------------------")
                    console.log("Artist: " + data.tracks.items[i].album.artists[0].name + "\nTrack Name: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nLink to Spotify: " + data.tracks.items[i].external_urls.spotify)
                    fs.appendFile("log.txt", "\nArtist: " + data.tracks.items[i].album.artists[0].name + "\nTrack Name: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nLink to Spotify: " + data.tracks.items[i].external_urls.spotify + "; ", function (err) {
                        if (err) console.log(err)
                    });
                };
            });
        };
    });
};

function movieThis(response) {
    var movieName = response.split(" ").join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            var dataFormat = response.data;
            if (dataFormat.Title === undefined) {
                axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
                    function (response) {
                        dataFormat = response.data;
                        console.log("\n----------------------")
                        console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
                    });
            } else {
                console.log("\n----------------------")
                console.log("Movie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors);
                //append to log.txt
                fs.appendFile("log.txt", "\nMovie Tite: " + dataFormat.Title + "\nRelease Year: " + dataFormat.Year + "\nIMDB Rating: " + dataFormat.imdbRating + "\nRotten Tomatoes Rating: " + dataFormat.Ratings[1].Value + "\nProduced in: " + dataFormat.Country + "\nLanguages: " + dataFormat.Language + "\nPlot: " + dataFormat.Plot + "\nActors: " + dataFormat.Actors + "; ", function (err) {
                    if (err) console.log(err)
                });
            };;
        }
    );
};

function bandsInTown(query) {
    var queryNormalize = query.split(" ").join("%20");
    var queryUrl = 'https://rest.bandsintown.com/artists/' + queryNormalize + '/events?app_id=trilogy';
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length === 0) {
                console.log("\nNo Shows for this Artist")
            } else {
                for (var i = 0; i < 5; i++) {
                    var venueName = response.data[i].venue.name;
                    var venueCity = response.data[i].venue.city;
                    var venueState = response.data[i].venue.region;
                    var venueCountry = response.data[i].venue.country;
                    var showDate = moment(response.data[i].datetime).format("MM-DD-YYYY");
                    console.log("Name of Venue: " + venueName + "\nLocation of Show: " + venueCity + ", " + venueState + ", " + venueCountry + "\nDate of Show: " + showDate);
                    console.log("\n----------------------")
                    fs.appendFile("log.txt", "\nName of Venue: " + venueName + "\nLocation of Show: " + venueCity + ", " + venueState + ", " + venueCountry + "\nDate of Show: " + showDate + "; ", function (err) {
                        if (err) console.log(err)
                    });
                };
            };
        });
};


//Bands In Town
if (commandInput === commands[0]) {
    bandsInTown(query);
};

//Spotify This Song
if (commandInput === commands[1]) {
    spotifyThisSong(query);
};

//Movie This
if (commandInput === commands[2]) {
    movieThis(query)
};

//Do What It Says
if (commandInput === commands[3]) {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var txtData = data.split(",");
        if (txtData[0] === commands[1]) {
            spotifyThisSong(txtData[1]);
        }
        if (txtData[0] === commands[0]) {
            bandsInTown(txtData[1]);
        }
        if (txtData[0] === commands[2]) {
            movieThis(txtData[1]);
        }
    });
};
