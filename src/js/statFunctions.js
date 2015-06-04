var Numeral = require('numeral')

function formatTime(number) {
  if(number < 10) {
    return '0' + number
  } else {
    return number
  }
}

function formatSeconds(seconds) {
  return ':' + formatTime(seconds % 60)
}

function formatMinutes(seconds) {
  var minutes = Math.trunc(seconds/60)
  return ':' + formatTime(minutes % 60)
}

function formatHours(seconds) {
  var hours = Math.trunc(seconds/3600)
  return formatTime(hours)
}

module.exports = {
  formatPercent : function(value) {
    return Numeral(value*100).format('0,0.00')
  },

  formatTimeInStream : function(seconds) {
    time = formatHours(seconds) + formatMinutes(seconds) + formatSeconds(seconds)
    return time
  },

  sizeOfObject : function(object) {
    size = 0
    for (var pair in object) {
      size += 1
    }
    return size
  },

  findTop : function(object) {
    var largest = 0
    var prop = []
    for (var key in object) {
      if (key !== ''){
        if (object[key] > largest) {
          largest = object[key]
          prop.splice(0, prop.length)
          prop.push(key)
        } else if (object[key] == largest) {
          prop.push(key)
        }
      }
    }
    return [prop, largest]
  }
}
