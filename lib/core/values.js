var getFiles = require("../util/getFiles")
var getFieldsValues = require("../util/getFieldsValues")
var {isUndefined} = require("util")
var output = require("./output")
var parseFile = require("../util/parseFile")

module.exports = function values(patterns, options) {
    if (!options.fields) throw new Error("You must provide fields to search")

    var matchData = []
    var files = getFiles(patterns, options.ignore)
    
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
