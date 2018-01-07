module.exports = function getDescendantProp(obj, key) {
    key = key.split('.')

    if (key.length > 1) {
        for (var i = 0; i < key.length - 1; i++)
            obj = obj[key[i]];
        
        return obj[key[i]];
    }

    return obj[key[0]]
}