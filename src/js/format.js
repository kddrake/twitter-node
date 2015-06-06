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

function formatPercent(value) {
  if (value == undefined || value == null) {
    return Numeral(0).format('0,0.0')
  } else {
    return Numeral(value).format('0,0.0')
  }
}
module.exports = {
  timeInStream : function(seconds) {
    time = formatHours(seconds) + formatMinutes(seconds) + formatSeconds(seconds)
    return time
  },

  percent : function(value) {
    if (!value) {
      return Numeral(0).format('0,0.0')
    } else {
      return Numeral(value).format('0,0.0')
    }
  }
}
