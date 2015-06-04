var EmojiData = require('./emoji.json')

var emojis = {}
var hashtags = {}
var urls = {}
var domains = {}
var countries = {}
var languages = {}

var uniqCount = { emojis: 0,
              hashtags: 0,
              urls: 0,
              domains: 0,
              countries: 0,
              languages: 0
}

var count = {emojis: 0,
             hashtags: 0,
             urls: 0}

var pictureUrls = 0

function ifLoop(item, object, countRef) {
  if (item in object) {
    object[item] += 1
  } else {
    uniqCount[countRef] += 1
    object[item] = 1
  }
}

function pullEmoji(tweets, tweet) {
  for (var emoji = 0; emoji < EmojiData.length; emoji++) {
    if(tweets[tweet].text.substring(JSON.stringify(EmojiData[emoji].unified)) !== -1) {
      count.emoji += 1
      ifLoop(EmojiData[emoji].name, emojis, 'emojis')
    }
  }
}

function pullHashtags(tweets, tweet) {
  if(tweets[tweet].entities.hashtags.length !== 0) {
    count.hashtags += 1
    for (var hashtag = 0; hashtag < tweets[tweet].entities.hashtags.length; hashtag++) {
      ifLoop(tweets[tweet].entities.hashtags[hashtag].text, hashtags, 'hashtags')
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
    uniqCount[domains] += 1
    domains[url] = 1
  }
}

function checkPictureUrl(url){
  if(url.indexOf('instagram') !== -1
  || url.indexOf('pic.twitter.com') !== -1
  || url.indexOf('twitpic') !== -1
  || url.indexOf('tweetphoto') !== -1
  || url.indexOf('pikchur') !== -1
  || url.indexOf('twitgoo') !== -1
  || url.indexOf('yfrog') !== -1
  || url.indexOf('picktor') !== -1) {
    pictureUrls += 1
  }
}

function pullUrls(tweets, tweet) {
  if(tweets[tweet].entities.urls.length !== 0) {
    count.urls += 1
    for(var url = 0; url < tweets[tweet].entities.urls.length; url++) {
      pullDomain(tweets[tweet].entities.urls[url].expanded_url)
      checkPictureUrl(tweets[tweet].entities.urls[url].expanded_url)
      ifLoop(tweets[tweet].entities.urls[url].expanded_url, urls, 'urls')
    }
  }
}

function pullCountries(tweets, tweet) {
  if(tweets[tweet].place !== null){
    ifLoop(tweets[tweet].place.country, countries, 'countries')
  }
}

function pullLanguages(tweets, tweet) {
  if(tweets[tweet].lang !== null) {
    ifLoop(tweets[tweet].lang, languages, 'languages')
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

  pictureUrls : function() {
    return pictureUrls
  },

  domains : function() {
    return domains
  },

  countries : function() {
    return countries
  },

  languages : function() {
    return languages
  },

  count : function() {
    return count
  },

  uniqCount : function() {
    return uniqCount
  }
}
