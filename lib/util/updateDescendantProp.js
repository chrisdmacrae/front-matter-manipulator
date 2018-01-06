module.exports = function updateDescendantProp(obj, path, replacement) {
    path = path.split('.')
    for (var i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];
    
    obj[path[i]] = replacement;
}