var _ = require("lodash")
var getFieldValue = require("./getFieldValue")
var {isUndefined} = require("util")

module.exports = function getFieldsValues(fields, fileData) {
    if (!fields) throw new Error("Missing value for \"fields\"")
    if (!fileData) throw new Error("Missing value for \"fileData\"")

    if (!Array.isArray(fileData))
        fileData = [fileData]

    var matches = {}
    for (var i = 0; i < fields.length; i++) {
        var returnObj = {}
        var field = fields[i]
        var matchData = fileData.reduce(function(results, fileData) {
            if (fileData !== null && !isUndefined(fileData))
                results.push(getFieldValue(field, fileData))
            return results
        }, [])
        matches[field] = _.uniq(matchData).filter(function(match) {
            return match !== undefined
        })
    }

    return matches
}