module.exports = {
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
