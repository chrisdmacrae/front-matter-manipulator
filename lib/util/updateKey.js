var isMissing = require("../util/isMissing")

module.exports = function updateKey(obj, key, replacement) {
    key = key.split('.')

    var parent
    for (var i = 0; i < key.length - 1; i++) {
        parent = obj
        obj = obj[key[i]]
    }

    if (Array.isArray(obj) && !isMissing(parent[key[i-1]])) {
        var value = obj
        delete parent[key[i-1]]
        parent[replacement] = value
    } else if (!isMissing(obj[key[i]])) {
        var value = obj[key[i]]
        delete obj[key[i]]
        obj[replacement] = value
    }
}