module.exports = function updateDescendantProp(obj, key, replacement) {
    key = key.split('.')
    for (var i = 0; i < key.length - 1; i++)
        obj = obj[key[i]];
    
    obj[key[i]] = replacement;
}