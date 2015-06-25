var Stream = require('./js/publicStream')
var Parse = require('./js/parseTweets')
var Stats = require('./js/statFunctions')
var format = require('./js/format')

var emojis, hashtags, urls, domains, countries, languages, top, topCount, secInc, milInc

var tweets = []
var tweetsCount = 0
var count = {}
var seconds = 0

function logTimeStats(seconds) {
  console.log('\n' + format.timeInStream(seconds) + '\nTweet Statistics:')
  console.log(' - Total Tweets:\n     ' + tweetsCount)
  console.log(' - Tweets/Second:\n     ' + format.percent(tweetsCount/seconds))
  console.log(' - Tweets/Mintue:\n     ' + format.percent(tweetsCount/seconds*60))
  console.log(' - Tweets/Hour:\n     ' + format.percent(tweetsCount/seconds*3600))
}

function logEmojiStats() {
  emojis = Parse.emojis()
  top = (Stats.findTop(emojis))[0]
  topCount = (Stats.findTop(emojis))[1]
  console.log('\nEmoji Statistics:')
  if(top.length > 1) {
    console.log(' - Top Emojis (each represents ' + format.percent((topCount/Parse.count().emojis)*100) +  '% of emojis)')
    for (var emoji = 0; emoji < top.length; emoji++) {
      console.log('   ' + top[emoji])
    }
  } else {
    console.log(' - Top Emoji:\n     ' + top[0] + '  (represents ' + format.percent((topCount/Parse.count().emojis)*100) + '% of emojis)')
  }
  console.log(' - Tweets w/ Emojis:\n     ' + format.percent((Parse.count().emojis/tweetsCount)*100) + '% (' + Parse.count().emojis + ' total)')
}

function logHashtagStats() {
  hashtags = Parse.hashtags()
  top = (Stats.findTop(hashtags))[0]
  topCount = (Stats.findTop(hashtags))[1]
  console.log('\nHashtag Statistics:')
  if(top.length > 1) {
    console.log(' - Top Hashtags (each represents ' + format.percent((topCount/Parse.uniqCount().hashtags)*100) + '% of hashtags):')
    if(top.length > 5) {
      for (var hashtag = 0; hashtag < 5; hashtag++) {
        console.log('     ' + top[hashtag])
      }
    } else {
      for (var hashtag = 0; hashtag < top.length; hashtag++) {
        console.log('     ' + top[hashtag])
      }
    }
  } else {
    console.log(' - Top Hashtag:\n     ' + top[0] + ' (represents ' + format.percent((topCount/Parse.uniqCount().hashtags)*100) + '% of all hashtags)')
  }
  console.log(' - Tweets w/ Hashtags:\n     ' + format.percent((Parse.count().hashtags/tweetsCount)*100) + '% (' + Parse.count().hashtags + ' total)')
}

function logUrlStats() {
  urls = Parse.urls()
  pictureUrls = Parse.pictureUrls()
  domains = Parse.domains()
  top = (Stats.findTop(domains))[0]
  topCount = (Stats.findTop(domains))[1]
  console.log('\nURL Statistics:')
  if(top.length > 1) {
    console.log(' - Top Domains (each represents ' + format.percent((topCount/Parse.uniqCount().urls)*100) + '% of all urls):')
    if (top.length > 5) {
      for (var domain = 0; domain < 5; domain++) {
        console.log('     ' + top[domain])
      }
    } else {
      for (var domain = 0; domain < top.length; domain++) {
        console.log('     ' + top[domain])
      }
    }
  } else {
    console.log(' - Top Domain:\n     ' + top[0] + ' (represents ' + format.percent((topCount/Parse.uniqCount().urls)*100) + '% of all urls)')
  }

  top = (Stats.findTop(urls))[0]
  topCount = (Stats.findTop(urls))[1]
  if(top.length > 1) {
    console.log(' - Top URLs (each represents ' + format.percent((topCount/Parse.uniqCount().urls)*100) + '% of all urls):')
    if(top.length > 5) {
      for (var url = 0; url < 5; url++) {
        console.log('     ' + top[url])
      }
    } else {
      for (var url = 0; url < top.length; url++) {
        console.log('     ' + top[url])
      }
    }
  } else {
    console.log(' - Top URL:\n     ' + top[0] + ' (represents ' + format.percent((topCount/Parse.uniqCount().urls)*100) + '% of all urls)')
  }
  console.log(' - Tweets w/ URLs:\n     ' + format.percent((Parse.count().urls/tweetsCount)*100) + '% (' + Parse.count().urls + ' total)')
  console.log(' - Tweets w/ Picture URLs (from Instagram, pic.twitter, etc.):\n     ' + format.percent((pictureUrls/tweetsCount)*100) + '% (' + pictureUrls + ' total)')
}

function logOtherStats() {
  countries = Parse.countries()
  languages = Parse.languages()
  top = (Stats.findTop(countries))[0]
  topCount = (Stats.findTop(countries))[1]
  console.log('\nOrigin and Language Statistics:')
  if(top.length > 1) {
    console.log(' - Top Countries from Geo-Tagging (each represents ' + format.percent((topCount/tweets.count)*100) +'% of all tweets)')
    if (top.length > 5) {
      for (var country = 0; country < 5; country++) {
        console.log('     ' + top[country])
      }
    } else {
      for (var country = 0; country < top.length; country++) {
        console.log('     ' + top[country])
      }
    }
  } else {
    console.log(' - Top Country from Geo-Tagging:\n     ' + top[0] + ' (represents ' + format.percent((topCount/tweetsCount)*100) + '% of all tweets)')
  }

  top = (Stats.findTop(languages))[0]
  topCount = (Stats.findTop(languages))[1]
  if(top.length > 1) {
    console.log(' - Top Languages (each represents ' + format.percent((topCount/tweetsCount)*100) +'% of all tweets)')
    if (top.length > 5) {
      for (var language = 0; language < 5; language++) {
        console.log('     ' + top[language])
      }
    } else {
      for (var language = 0; language < top.length; language++) {
        console.log('     ' + top[language])
      }
    }
  } else {
    console.log(' - Top Language:\n     ' + top[0] + ' (represents ' + format.percent((topCount/tweetsCount)*100) + '% of all tweets)')
  }
}

function logStats(seconds) {
  if (tweetsCount > 0) {
    logTimeStats(seconds)
    logEmojiStats()
    logHashtagStats()
    logUrlStats()
    logOtherStats()
  } else {
    console.log('No tweets yet...\n')
  }
}

function setLogInterval() {
  if(process.argv[2]) {
    arg = Number(process.argv[2])
    if(process.argv[2] >= 5) {
      secInc = arg
      console.log("- The stream's data will be logged every " + arg + " seconds")
      milInc = arg*1000
    } else {
      console.log("- The stream's data will be logged every 10 seconds")
      secInc = 10
      milInc = 10000
    }
  } else {
    console.log("- The stream's data will be logged every 10 seconds")
    secInc = 10
    milInc = 10000
  }
}

setLogInterval()
Stream.stream()
console.log('- Stream started\n')
setInterval(function() {
  seconds += secInc
  tweets = Stream.getTweets()
  tweetsCount = Stream.getTweetsTotal()

  //Parse Tweets
  Parse.parseTweets(tweets)
  count = Parse.uniqCount()

  //Display Results
  logStats(seconds)
  tweets.splice(0, tweets.length)
}, milInc)
