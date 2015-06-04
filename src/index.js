var Stream = require('./js/publicStream')
var Parse = require('./js/parseTweets')
var Stats = require('./js/statFunctions')

//{'text': [],
//              'urls': [],
//              'hashtags': [],
//              'countries': [],
//              'languages': [],
//              'retweets': 0}

var emojis, hashtags, urls, domains, countries, languages

var tweets = []
var seconds = 0

Stream.stream()
setInterval(function() {
  seconds += 2.5
  tweets = Stream.getTweets()
  tweetsCount = Stream.getTweetsTotal()

  //Parse Tweets
  Parse.parseTweets(tweets)
  emojis = Parse.emojis()
  hashtags = Parse.hashtags()
  urls = Parse.urls()
  domains = Parse.domains()
  countries = Parse.countries()
  languages = Parse.languages()

  //Display Results
  console.log('///////////////////////////////////////////////')
  console.log(tweetsCount)
  console.log((Stats.findTop(emojis)[0])[0])
  console.log((Stats.findTop(hashtags)[0])[0])
  console.log((Stats.findTop(urls)[0])[0])
  console.log((Stats.findTop(domains)[0])[0])
  console.log((Stats.findTop(countries)[0])[0])
  console.log((Stats.findTop(languages)[0])[0])
  tweets.splice(0, tweets.length)
}, 2500)
