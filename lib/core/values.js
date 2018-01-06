var getFiles = require("../util/getFiles")
var getFieldsValues = require("../util/getFieldsValues")
var {isUndefined} = require("util")
var output = require("./output")
var parseFile = require("../util/parseFile")

module.exports = function values(patterns, fields, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!fields) throw new Error("Missing value for \"fields\"")

    var matchData = []
    var files = getFiles(patterns, options.ignore)
    
    if(files.length > 0) {
        var allFilesData = files.reduce(function(results, f) {
            if (f.file !== null && !isUndefined(f.file)) {
                var {data} = parseFile(f.file)
                results.push(data)
            }
            return results
        }, [])

        var matchData = getFieldsValues(fields, allFilesData)
    }

    return output(matchData, options)
 }
