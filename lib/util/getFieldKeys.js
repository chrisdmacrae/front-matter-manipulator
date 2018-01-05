module.exports = function getKeys(obj) {
    var all = {};
    var seen = [];
    checkValue(obj);
    return Object.keys(all);
    function checkValue(value) {
      if (Array.isArray(value)) return checkArray(value);
      if (value instanceof Object) return checkObject(value);
    }

    function checkArray(array) {
      if (seen.indexOf(array) >= 0) return;
      seen.push(array);
      for (var i = 0, l = array.length; i < l; i++) {
        checkValue(array[i]);
      }
    }

    function checkObject(obj) {
      if (seen.indexOf(obj) >= 0) return;
      seen.push(obj);
      var keys = Object.keys(obj);
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        all[key] = true;
        checkValue(obj[key]);
      }
    }
  }