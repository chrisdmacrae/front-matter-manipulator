var getFiles = require("./core/getFiles")
var getFieldsValues = require("./core/getFieldsValues")
var {isUndefined} = require("util")
var output = require("./core/output")
var parseFile = require("./core/parseFile")

module.exports = function (patterns, options) {
    if (!options.fields) throw new Error("You must provide fields to search")

    var matchData = []
    var files = getFiles(patterns)
    
    if(files.length > 0) {
        var allFilesData = files.reduce(function(results, file) {
            if (file !== null && !isUndefined(file))
                results.push(parseFile(file))
            return results
        }, [])

        var matchData = getFieldsValues(options.fields, allFilesData)
    }

    return output(matchData, options)
 }
