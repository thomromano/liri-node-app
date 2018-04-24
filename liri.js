const dotenv = require("dotenv").config();

//store dependencies as variables.
const keys = require('./keys.js');
const twitter = require("twitter");
const spotify = require("node-spotify-api");
const request = require("request");
const fs = require('fs');


console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

var userCommand = process.argv[2];
var secondCommand = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
	secondCommand += '+' + process.argv[i];
}

function theSwitch() {

	switch (userCommand) {

		case 'my-tweets':
			fetchTweets();
			break;

		case 'spotify-this-song':
			spotifyMe();
			break;

		case 'movie-this':
			movieSearch();
			break;

		case 'do-what-it-says':
			followRules();
			break;

	}
};

function fetchTweets() {
	console.log("Here are your tweets");

	const client = new twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

	});


	var parameters = {
		screen_name: 'mr_thom_',
		count: 20
	};

	client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
				console.log(returnedData);
				console.log("-------------------------");
			}
		};
	});
};

function spotifyMe() {
	console.log("Search music");

	exports.spotify = {
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET
	  };
	  


	var searchTrack;
	if (secondCommand === undefined) {
		searchTrack = "The Sign";
	} else {
		searchTrack = secondCommand;
	}

	spotify.search({
		type: 'track',
		query: searchTrack
	}, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		} else {

			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("Preview Here: " + data.tracks.items[0].preview_url);
		}
	});
};

const movieSearch = function(movie) {
	
}
	console.log("Search movies");


	var searchMovie;
	if (secondCommand === undefined) {
		searchMovie = "Mr. Nobody";
	} else {
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie + '&y=&plot=long&tomatoes=true&r=json';
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("Title: " + JSON.parse(body)["Title"]);
			console.log("Year: " + JSON.parse(body)["Year"]);
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
			console.log("Country: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			
		}
	});


function followRules() {
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			console.log(error);
		} else {


			var dataArr = data.split(',');
			userCommand = dataArr[0];
			secondCommand = dataArr[1];

			for (i = 2; i < dataArr.length; i++) {
				secondCommand = secondCommand + "+" + dataArr[i];
			};

			theSwitch();

		};

	});

};

theSwitch();