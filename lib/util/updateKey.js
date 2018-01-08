module.exports = function updateKey(obj, key, replacement) {
    key = key.split('.')

    var parent
    for (var i = 0; i < key.length - 1; i++) {
        parent = obj
        obj = obj[key[i]]
    }
    
    if (Array.isArray(obj)) {
        var value = obj
        delete parent[key[i-1]]
        parent[replacement] = value
    } else {
        var value = obj[key[i]]
        delete obj[key[i]]
        obj[replacement] = value
    }
}