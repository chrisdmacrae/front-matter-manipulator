var fs = require("fs")
var filterByField = require("./core/filterByField")
var getFiles = require("./core/getFiles")
var parseFile = require("./core/parseFile")

module.exports = function getFields(patterns, options) {
    var matchData = []
    var files = getFiles(patterns)

    if(files.length > 0) {
        var allFilesData = files.reduce(function(results, file) {
            results.push(parseFile(file))
            return results
        }, [])

        matchData = allFilesData

        if (options.filters.length > 0) {
            matchData = filterByField(options.filters, matchData)
        }
    }

    if (options.output) {
        fs.writeFileSync(fileToWrite, JSON.stringify(matchData))
    }

    if (options.log) {
        console.log(matchData)
    }

    return matchData
}