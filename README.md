# LIRI-Bot   👾 
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## Functionality
LIRI will search Spotify for songs, Bands In Town for concerts, and OMDB for Movies

## Process 📋 
launch node liri.js
type in one of the following commands:

### 1. node liri.js concert-this <artist/band name here> 🎤 

* This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
    -  Name of the venue
    - Venue location
    - Date of the Event

### 2. node liri.js spotify-this-song <song name here>  🎼 

- This will show the following information about the song in your terminal/bash window
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from
    - If no song is provided, program will default to "The Sign" by Ace of Base.

### 3. node liri.js movie-this <movie name here> 🎬

- This will output the following information to your terminal/bash window:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

### 4. node liri.js do-what-it-says ⁉️ 

- Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

## Node Packages Used   🔨 
- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
- [Axios](https://www.npmjs.com/package/axios)
- [Moment](https://www.npmjs.com/package/moment)
- [DotEnv](https://www.npmjs.com/package/dotenv)