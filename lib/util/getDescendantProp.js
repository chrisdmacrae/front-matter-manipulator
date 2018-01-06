module.exports = function getDescendantProp(obj, path) {
    path = path.split('.')
    for (var i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];
    
    return obj[path[i]];
}