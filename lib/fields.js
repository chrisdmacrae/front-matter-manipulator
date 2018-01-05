var _ = require("lodash")
var deepmerge = require("deepmerge")
var filterByField = require("./core/filterByField")
var getFiles = require("./core/getFiles")
var getKeys = require("./core/getFieldKeys")
var {isUndefined} = require("util")
var output = require("./core/output")
var parseFile = require("./core/parseFile")

module.exports = function getFields(patterns, options) {
    var matchData = []
    var files = getFiles(patterns)

    if(files.length > 0) {
        var rawMatches = files.reduce(function(results, file) {
            if (file !== null && !isUndefined(file))
                results.push(parseFile(file))
            return results
        }, [])

        if (options.exclude.length > 0) {
            rawMatches = filterByField(options.exclude, rawMatches, true)
        }

        if (options.include.length > 0) {
            console.log(options.include)
            rawMatches = filterByField(options.include, rawMatches)
        }

        cleanData = rawMatches.filter(function(n) {
            return n !== null && !isUndefined(null)
        })

        matchData = deepmerge.all(cleanData, { arrayMerge: uniqueKeys})
    }

    return output(matchData, options)
}

function uniqueKeys(dest, source, options) {
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
    }

    return source
}