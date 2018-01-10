var _ = require("lodash")
var deepmerge = require("deepmerge")
var filterByField = require("../util/filterByField")
var getFiles = require("../util/getFiles")
var getFieldPermutations = require("../util/getFieldPermutations")
var getKeys = require("../util/getFieldKeys")
var isMissing = require("../util/isMissing")
var output = require("./output")
var parseFile = require("../util/parseFile")
var uniqueKeys = require("../util/uniqueKeys")

module.exports = function fields(patterns, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")

    const defaultOptions = {
        exclude: "",
        include: ""
    }

    options = Object.assign(defaultOptions, options)

    if (options.exclude) {
        var filters = options.exclude.split(",")
        options.exclude = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.exclude = []
    }

    if (options.include) {
        var filters = options.include.split(",")
        options.include = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.include = []
    }
    
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

        matchData = Object.keys(matchData).map(function(k) {
            var cleanRegex = /\.\d|\"/gi
            var value = getFieldPermutations(k, matchData)
            if (typeof value[0] == "string")
                value = value[0].replace(cleanRegex, "")
            return value
        }).reduce(function(a, b) {
            return a.concat(b)
        }, []).filter(function(k) {
            return !isMissing(k)
        })

        matchData = _.uniq(matchData)
    }

    return output(matchData, options)
}
