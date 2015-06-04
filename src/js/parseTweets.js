var EmojiData = require('./emoji.json')

var emojis = {}
var hashtags = {}
var urls = {}
var domains = {}
var countries = {}
var languages = {}

var pictureUrls = 0

function ifLoop(item, object) {
  if (item in object) {
    object[item] += 1
  } else {
    object[item] = 1
  }
}

function pullEmoji(tweets, tweet) {
  for (var emoji = 1; emoji < EmojiData.length; emoji++) {
    if(tweets[tweet].text.substring(EmojiData[emoji].unified) !== -1) {
      ifLoop(EmojiData[emoji].name, emojis)
    }
  }
}

function pullHashtags(tweets, tweet) {
  if(tweets[tweet].entities.hashtags.length !== 0) {
    for (var hashtag = 0; hashtag < tweets[tweet].entities.hashtags.length; hashtag++) {
      ifLoop(tweets[tweet].entities.hashtags[hashtag].text, hashtags)
    }
  }
}

function pullUrls(tweets, tweet) {
  if(tweets[tweet].entities.urls.length !== 0) {
    for(var url = 0; url < tweets[tweet].entities.urls.length; url++) {
      pullDomain(tweets[tweet].entities.urls[url].expanded_url)
      ifLoop(tweets[tweet].entities.urls[url].expanded_url, urls)
    }
  }
}

function pullDomain(url) {
  var length = url.length + 1
  if(url.indexOf('http://') !== -1) {
    url = url.substring(7, length)
  } else if (url.indexOf('https://') !== -1) {
    url = url.substring(8, length)
  }
  if(url.indexOf('www.') !== -1) {
    url = url.substring(4, length)
  }
  url = url.substring(0, url.indexOf('/'))
  if(url in domains) {
    domains[url] += 1
  } else {
    domains[url] = 1
  }
}

function pullCountries(tweets, tweet) {
  if(tweets[tweet].place !== null){
    ifLoop(tweets[tweet].place.country, countries)
  }
}

function pullLanguages(tweets, tweet) {
  if(tweets[tweet].lang !== null) {
    ifLoop(tweets[tweet].lang, languages)
  }
}

function pullApart(tweets) {
  for (var tweet = 0; tweet < tweets.length; tweet++) {
    pullEmoji(tweets, tweet)
    pullHashtags(tweets, tweet)
    pullUrls(tweets, tweet)
    pullCountries(tweets, tweet)
    pullLanguages(tweets, tweet)
  }
}


module.exports = {
  parseTweets : function(tweets) {
    pullApart(tweets)
  },

  emojis : function() {
    return emojis
  },

  hashtags : function() {
    return hashtags
  },

  urls : function() {
    return urls
  },

  domains : function() {
    return domains
  },

  countries : function() {
    return countries
  },

  languages : function() {
    return languages
  }
}
