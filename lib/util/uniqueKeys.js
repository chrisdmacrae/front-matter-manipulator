module.exports = function uniqueKeys(dest, source) {
    if (typeof source[0] === "object" && !Array.isArray(source[0])) {
        var returnObj = {}
        var keys = Object.keys(source.reduce(function(result, obj) {
            return Object.assign(result, obj);
        }, {}))

        for (var i = 0; i < source.length; i++) {
            keys.map(function(k) {
                if(returnObj[k] === undefined)
                    returnObj[k] = source[i][k]
            })
        }
        return returnObj
    } else if (Array.isArray(source[0])) {
        return uniqueKeys(source)
    }

    return source
}