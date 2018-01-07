module.exports = function updateKey(obj, key, replacement) {
    key = key.split('.')
    for (var i = 0; i < key.length - 1; i++)
        obj = obj[key[i]]
    
    var value = obj[key[i]]
    delete obj[key[i]]
    obj[replacement] = value
}