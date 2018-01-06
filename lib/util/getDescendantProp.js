module.exports = function getDescendantProp(obj, path) {
    path = path.split('.')

    if (path.length > 1) {
        for (var i = 0; i < path.length - 1; i++)
            obj = obj[path[i]];
        
        return obj[path[i]];
    }

    return obj[path[0]]
}