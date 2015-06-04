var Twitter = require('Twitter')
var Stats = require('./statFunctions')

var client = new Twitter({
  consumer_key: "QbwSOAvavzIg3tFAhUW6531yC",
  consumer_secret: "60fMhDqJhrQu3AXfWhjvyAo8xSBkTv4CVgcc8Ek2DSmtvSGUX3",
  access_token_key: "3189981193-ekQ8IS91KSna8Mp42hkOaLbXnNTnzllq6BMqxWA",
  access_token_secret: "vXrk4YH5pWXspyGV81oGlaxskEK7K1C8MSHScyQDfN9wf",
})

var tweets = []
var totalTweets = 0

function getData(tweet) {
}

function startStream() {
  client.stream('statuses/sample', function(stream) {
    stream.on('data', function(tweet) {
      if(tweet.delete) {
      } else if(tweet.scrub_geo) {
        console.log('Tweet\'s geo-tag must be scrubbed')
      } else if(tweet.limit) {
        console.log('Current rate limit hit')
      } else if(tweet.disconnect) {
        console.log("Disconnect message recieved")
        console.log(tweet.disconnect.code + ': ' + tweet.disconnect.reason)
      } else {
        totalTweets += 1
        tweets.push(tweet)
      }
    });
    stream.on('error', function(error) {
      console.log(error);
    });
  });
}

module.exports = {

  stream : function() {
    startStream()
  },

  getTweets : function() {
    return tweets
    tweets.splice(0, tweets.length)
  },

  getTweetsTotal : function() {
    return totalTweets
  }
}
