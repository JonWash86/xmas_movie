// app.js
var Twitter = require('twitter');
var config = require('./config.js');
var movieList = require('./movies.json');
const request = require('request');

var twit = new Twitter(config);

// Movie generation
function getRandomFilm(){
  var index = movieList.length - 1
  console.log(index);
  var filmPosition = fetchFilmPosition(index)
  var filmMessage = movieList[filmPosition].title + ' (' + movieList[filmPosition].year + ')' + ' is a Christmas Movie';
  movieList.splice(filmPosition, 1);

  console.log(filmMessage);

  twit.post('statuses/update', {status: filmMessage})
  .then(function(tweet){
    console.log(tweet);
  })
  .catch(function(error){
    throw(error);
  })

  var randomInterval = getRandomInterval();
  console.log(60000 * randomInterval);
  setTimeout(function(){getRandomFilm()}, 60000 * randomInterval);
}

// Movie ID generation
function fetchFilmPosition(index){
  var id = Math.floor(Math.random() * (index)) +  1;
  console.log(id);
  return id;
}

function getRandomInterval(){
  var interval = Math.floor(Math.random() * (90 - 20) + 20);
  console.log(interval);
  return interval;
}

getRandomFilm();
