module.exports = function getDescendantProp(obj, key) {
    key = key.split('.')

    var i = 0
    if (key.length > 1) {
        for (i = 0; i < key.length - 1; i++)
            obj = obj[key[i]];
        
        if (obj)
            return obj[key[i]];
    }

    if (obj)
        return obj[key[i]]
}