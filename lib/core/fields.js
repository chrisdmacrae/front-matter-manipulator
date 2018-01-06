var _ = require("lodash")
var deepmerge = require("deepmerge")
var filterByField = require("../util/filterByField")
var getFiles = require("../util/getFiles")
var getKeys = require("../util/getFieldKeys")
var isMissing = require("../helpers/isMissing")
var output = require("./output")
var parseFile = require("../util/parseFile")
var uniqueKeys = require("../util/uniqueKeys")

module.exports = function fields(patterns, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    
    var matchData = []
    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        var rawMatches = files.reduce(function(results, f) {
            if (!isMissing(f.file)) {
                var {data} = parseFile(f.file)
                results.push(data)
            }
            return results
        }, [])

        if (options.exclude.length > 0) {
            rawMatches = filterByField(options.exclude, rawMatches, true)
        }

        if (options.include.length > 0) {
            rawMatches = filterByField(options.include, rawMatches)
        }

        cleanData = rawMatches.filter(function(n) {
            return !isMissing(n)
        })

        matchData = deepmerge.all(cleanData, { arrayMerge: uniqueKeys})
    }

    return output(matchData, options)
}
